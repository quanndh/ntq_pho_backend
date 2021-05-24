import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlCookieAuthGuard } from 'src/guards/gql-auth.guard';
import { Chat } from 'src/modules/chat/entities/chat.entity';
import { ChatService } from 'src/modules/chat/services/chat.service';

@Resolver(() => Chat)
export class ChatMutationResolver {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(GqlCookieAuthGuard)
  @Mutation(() => Chat)
  async createChat(@Args({ name: 'participants', type: () => [Number] }) participants: number[]) {
    return await this.chatService.create(participants);
  }

  @UseGuards(GqlCookieAuthGuard)
  @Mutation(() => Number)
  async deleteChat(@Args('id') id: number) {
    return await this.chatService.remove(id);
  }
}
