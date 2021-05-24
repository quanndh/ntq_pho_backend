import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/common.decorator';
import { GqlCookieAuthGuard } from 'src/guards/gql-auth.guard';
import { Message, MessageConnection } from 'src/modules/chat/entities/message.entity';
import { MessageService } from 'src/modules/chat/services/message.service';
import { User } from 'src/modules/users/entities/users.entity';

@Resolver(() => Message)
export class MessageQueryResolver {
  constructor(private readonly messageService: MessageService) { }

  @UseGuards(GqlCookieAuthGuard)
  @Query(() => MessageConnection)
  async getMessage(@Args('chatId') chatId: number, @Args('limit') limit: number, @Args('page') page: number, @CurrentUser() user: User) {
    return await this.messageService.getMessage(chatId, limit, page, user.id);
  }
}
