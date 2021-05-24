import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageDataloader } from 'src/modules/chat/dataloaders/message.dataloader';
import { Chat } from 'src/modules/chat/entities/chat.entity';
import { Message } from 'src/modules/chat/entities/message.entity';
import { ChatRepository } from 'src/modules/chat/repositories/chat.repository';
import { MessageRepository } from 'src/modules/chat/repositories/message.repository';
import { ChatFieldResolver } from 'src/modules/chat/resolvers/chats/chat_field.resolver';
import { ChatMutationResolver } from 'src/modules/chat/resolvers/chats/chat_mutation.resolver';
import { ChatQueryResolver } from 'src/modules/chat/resolvers/chats/chat_query.resolver';
import { MesageFieldResolver } from 'src/modules/chat/resolvers/messages/message_field.resolver';
import { MessageMutationResolver } from 'src/modules/chat/resolvers/messages/message_mutation.resolver';
import { MessageQueryResolver } from 'src/modules/chat/resolvers/messages/message_query.resolver';
import { MessageSubscriptionResolver } from 'src/modules/chat/resolvers/messages/message_subscription.resolver';
import { ChatService } from 'src/modules/chat/services/chat.service';
import { MessageService } from 'src/modules/chat/services/message.service';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, ChatRepository, Message, MessageRepository]),
    forwardRef(() => UsersModule),
  ],
  providers: [
    ChatService,
    ChatQueryResolver,
    ChatMutationResolver,
    ChatFieldResolver,
    MessageQueryResolver,
    MessageMutationResolver,
    MesageFieldResolver,
    MessageSubscriptionResolver,
    MessageDataloader,
    MessageService,
  ],
  exports: [ChatService, MessageDataloader, MessageService],
})
export class ChatModule {}
