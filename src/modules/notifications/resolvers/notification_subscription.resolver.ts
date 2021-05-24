import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { PubsubEventEnum } from 'src/graphql/enums/pubsub/pubsub_event.enum';
import { pubSub } from 'src/helpers/pubsub';
import { Notification } from 'src/modules/notifications/entities/notification.entity';

@Resolver(() => Notification)
export class NotificationSubscriptionResolver {
  @Subscription(() => Notification, {
    filter: (payload, vars, context) => {
      return Number(payload.onNewNotification.userId) === Number(vars.userId);
    },
  })
  onNewNotification(@Args('userId') userId: number) {
    return pubSub.asyncIterator(PubsubEventEnum.onNewNotification);
  }
}
