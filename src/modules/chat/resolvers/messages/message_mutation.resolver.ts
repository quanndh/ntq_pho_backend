import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/common.decorator';
import { GqlCookieAuthGuard } from 'src/guards/gql-auth.guard';
import { NewMessageInput } from 'src/modules/chat/dtos/new-message.input';
import { Message } from 'src/modules/chat/entities/message.entity';
import { MessageService } from 'src/modules/chat/services/message.service';
import { User } from 'src/modules/users/entities/users.entity';

@Resolver(() => Message)
export class MessageMutationResolver {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(GqlCookieAuthGuard)
  @Mutation(() => Message)
  async sendMessage(
    @CurrentUser() user: User,
    @Args({ name: 'input', type: () => NewMessageInput }) input: NewMessageInput,
  ) {
    return await this.messageService.sendMessage(user.id, input);
  }

  @UseGuards(GqlCookieAuthGuard)
  @Mutation(() => Boolean)
  async setSeenMessage(@Args('chatId') chatId: number, @CurrentUser() user: User) {
    return await this.messageService.setSeen(chatId, user.id);
  }
}
