import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Notification } from 'src/modules/notifications/entities/notification.entity';
import { UserDataLoader } from 'src/modules/users/dataloaders/users.dataloader';
import { User } from 'src/modules/users/entities/users.entity';

@Resolver(() => Notification)
export class NotificationFieldResolver {
  constructor(private readonly userDataloader: UserDataLoader) {}

  @ResolveField(() => User)
  async triggerInfo(@Parent() noti: Notification) {
    return await this.userDataloader.load(noti.triggerId);
  }
}
