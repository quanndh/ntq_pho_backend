import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/common.decorator';
import { GqlCookieAuthGuard } from 'src/guards/gql-auth.guard';
import { MessageDataloader } from 'src/modules/chat/dataloaders/message.dataloader';
import { Chat } from 'src/modules/chat/entities/chat.entity';
import { Message } from 'src/modules/chat/entities/message.entity';
import { UserDataLoader } from 'src/modules/users/dataloaders/users.dataloader';
import { User } from 'src/modules/users/entities/users.entity';
import { MessageService } from '../../services/message.service';

@Resolver(() => Chat)
export class ChatFieldResolver {
  constructor(private readonly userDataloader: UserDataLoader, private readonly messageDataloader: MessageDataloader, private readonly messageService: MessageService) { }

  @ResolveField(() => [User])
  async participantInfo(@Parent() chat: Chat) {
    return await this.userDataloader.loadMany(chat.participants);
  }

  @ResolveField(() => Message, { nullable: true })
  async lastMessageData(@Parent() chat: Chat) {
    return await this.messageService.getLastMessage(chat.id);
  }

  @UseGuards(GqlCookieAuthGuard)
  @ResolveField(() => Number, { defaultValue: 0 })
  async unseenMessage(@CurrentUser() user: User, @Parent() chat: Chat) {
    return await this.messageService.countUnseenMessageOfChat(user.id, chat.id)
  }

}
