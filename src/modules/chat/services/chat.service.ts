import { Injectable } from "@nestjs/common";
import { ApolloError } from "apollo-server";
import moment from "moment";
import { Chat } from "src/modules/chat/entities/chat.entity";
import { Message } from "src/modules/chat/entities/message.entity";
import { ChatRepository } from "src/modules/chat/repositories/chat.repository";
import { createPaginationObject } from "src/modules/common/common.repository";
import { DeepPartial, MoreThan } from "typeorm";

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  findById = async (id: number) => {
    try {
      return await this.chatRepository.findOne({ id });
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  countUnseenMessageOfChat = async (userId: number, chatId: number) => {
    try {
      const a = await this.chatRepository
        .createQueryBuilder("chat")
        .innerJoin(Message, "mess", "mess.chatId = chat.id")
        .andWhere("(mess.sender != :userId AND mess.received = false)", {
          userId,
        })
        .andWhere("chat.id = :chatId", { chatId })
        .getMany();
      return 1;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  getChats = async (userId: number, limit: number, page: number) => {
    try {
      const [items, total] = await this.chatRepository
        .createQueryBuilder("chat")
        .where("chat.participants && ARRAY[:...userId]", { userId: [userId] })
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy("chat.updatedAt", "DESC")
        .getManyAndCount();
      return createPaginationObject(items, total, page, limit);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getExist = async (participants: number[]) => {
    try {
      return await this.chatRepository
        .createQueryBuilder("chat")
        .where(
          `chat.participants::int[] = ARRAY[${participants[0]}, ${participants[1]}] OR chat.participants::int[] = ARRAY[${participants[1]}, ${participants[0]}]`
        )
        .getOne();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  create = async (participants: number[]) => {
    try {
      const newChat = await this.chatRepository.create({ participants });
      return await this.chatRepository.save(newChat);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (id: number, data: DeepPartial<Chat>) => {
    await this.chatRepository.update({ id }, { ...data });
    return true;
  };

  getChatHasUnseenMessage = async (userId: number) => {
    try {
      const chats = await this.chatRepository
        .createQueryBuilder("chat")
        .innerJoin(Message, "mess", "mess.chatId = chat.id")
        .where("chat.participants && ARRAY[:...users]", { users: [userId] })
        .andWhere("(mess.sender != :userId AND mess.received = false)", {
          userId,
        })
        .getMany();
      return chats.map((item) => item.id);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  remove = async (id: number) => {
    try {
      await this.chatRepository.delete(id);
      return id;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  clearTempChat = async () => {
    try {
      await this.chatRepository.delete({
        isTemp: true,
        createdAt: MoreThan(moment().subtract(30, "minutes").toDate()),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
