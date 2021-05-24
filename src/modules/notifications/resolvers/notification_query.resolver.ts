import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/common.decorator';
import { GqlCookieAuthGuard } from 'src/guards/gql-auth.guard';
import { Notification, NotificationConnection } from 'src/modules/notifications/entities/notification.entity';
import { NotificationService } from 'src/modules/notifications/services/notification.service';
import { User } from 'src/modules/users/entities/users.entity';

@Resolver(() => Notification)
export class NotificationQueryResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(GqlCookieAuthGuard)
  @Query(() => NotificationConnection)
  async getNotification(@CurrentUser() user: User, @Args('limit') limit: number, @Args('page') page: number) {
    return await this.notificationService.find(user.id, limit, page);
  }

  @UseGuards(GqlCookieAuthGuard)
  @Query(() => Number)
  async countUnSeenNotification(@CurrentUser() user: User) {
    return await this.notificationService.countUnseen(user.id);
  }

  @UseGuards(GqlCookieAuthGuard)
  @Mutation(() => Boolean)
  async setSeenNotification(@CurrentUser() user: User) {
    return await this.notificationService.setSeen(user.id);
  }
}
