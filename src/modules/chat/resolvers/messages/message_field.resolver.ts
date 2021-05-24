import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Message } from 'src/modules/chat/entities/message.entity';
import { UserDataLoader } from 'src/modules/users/dataloaders/users.dataloader';
import { User } from 'src/modules/users/entities/users.entity';

@Resolver(() => Message)
export class MesageFieldResolver {
  constructor(private readonly userDataloader: UserDataLoader) {}

  @ResolveField(() => User)
  async senderInfo(@Parent() message: Message) {
    return await this.userDataloader.load(message.sender);
  }
}
