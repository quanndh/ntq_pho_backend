import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/common.decorator';
import { GqlCookieAuthGuard } from 'src/guards/gql-auth.guard';
import { Chat, ChatConnection } from 'src/modules/chat/entities/chat.entity';
import { ChatService } from 'src/modules/chat/services/chat.service';
import { User } from 'src/modules/users/entities/users.entity';

@Resolver(() => Chat)
export class ChatQueryResolver {
  constructor(private readonly chatService: ChatService) { }

  @UseGuards(GqlCookieAuthGuard)
  @Query(() => ChatConnection)
  async getChats(@CurrentUser() user: User, @Args('limit') limit: number, @Args('page') page: number) {
    return await this.chatService.getChats(user.id, limit, page);
  }

  @UseGuards(GqlCookieAuthGuard)
  @Query(() => Chat, { nullable: true })
  async getExistChat(@Args({ name: 'participants', type: () => [Number] }) participants: number[]) {
    return await this.chatService.getExist(participants);
  }

  @UseGuards(GqlCookieAuthGuard)
  @Query(() => [Number], { defaultValue: [] })
  async getChatHasUnseenMessage(@CurrentUser() user: User) {
    return await this.chatService.getChatHasUnseenMessage(user.id)
  }
}
