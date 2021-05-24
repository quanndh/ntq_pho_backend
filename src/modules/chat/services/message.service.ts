import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-errors';
import { PubsubEventEnum } from 'src/graphql/enums/pubsub/pubsub_event.enum';
import { pubSub } from 'src/helpers/pubsub';
import { Message } from 'src/modules/chat/entities/message.entity';
import { MessageRepository } from 'src/modules/chat/repositories/message.repository';
import { createPaginationObject } from 'src/modules/common/common.repository';
import { DeepPartial, Not } from 'typeorm';
import { Chat } from '../entities/chat.entity';
import { ChatService } from './chat.service';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepo: MessageRepository, private readonly chatService: ChatService) {}

  getLastMessage = async (chatId: number) => {
    try {
      return await this.messageRepo.findOne({ where: { chatId }, order: { createdAt: 'DESC' } });
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  setSeen = async (chatId: number, userId: number) => {
    void pubSub.publish(PubsubEventEnum.onSeenMessage, { onSeenMessage: { userId, chatId } });
    await this.messageRepo.update({ chatId, sender: Not(userId) }, { received: true });
  };

  countUnseenMessageOfChat = async (userId: number, chatId: number) => {
    try {
      return await this.messageRepo
        .createQueryBuilder('mess')
        .innerJoin(Chat, 'chat', 'mess.chatId = chat.id')
        .andWhere('(mess.sender != :userId AND mess.received = false)', { userId })
        .andWhere('chat.id = :chatId', { chatId })
        .getCount();
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  getMessage = async (chatId: number, limit: number, page: number, userId: number) => {
    try {
      const [items, total] = await this.messageRepo.findAndCount({
        where: { chatId },
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'DESC' },
      });
      await this.messageRepo.update(
        {
          sender: Not(userId),
        },
        { received: true },
      );
      void pubSub.publish(PubsubEventEnum.onSeenMessage, { onSeenMessage: { userId, chatId } });
      return createPaginationObject(items, total, page, limit);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  sendMessage = async (senderId: number, data: DeepPartial<Message>) => {
    try {
      const chatInfo = await this.chatService.findById(data.chatId ?? 0);
      if (!chatInfo) {
        throw new ApolloError('Chat not found');
      }
      const newMessage = await this.messageRepo.create({ ...data, sender: senderId, sent: true });
      const savedMessage = await this.messageRepo.save(newMessage);
      void pubSub.publish(PubsubEventEnum.onNewMessage, { onNewMessage: savedMessage });
      const receiver = chatInfo.participants.filter((user) => Number(user) !== Number(senderId));
      void pubSub.publish(PubsubEventEnum.onReceiveMessage, {
        onReceiveMessage: { userId: Number(receiver[0]), chatId: chatInfo.id, message: savedMessage },
      });
      await this.chatService.update(data.chatId ?? 0, { lastMessage: savedMessage.id, isTemp: false });
      return savedMessage;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };
}
