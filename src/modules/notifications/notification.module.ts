import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from 'src/modules/notifications/entities/notification.entity';
import { NotificationRepository } from 'src/modules/notifications/repositories/notification.repository';
import { NotificationFieldResolver } from 'src/modules/notifications/resolvers/notification_field.resolver';
import { NotificationQueryResolver } from 'src/modules/notifications/resolvers/notification_query.resolver';
import { NotificationSubscriptionResolver } from 'src/modules/notifications/resolvers/notification_subscription.resolver';
import { NotificationService } from 'src/modules/notifications/services/notification.service';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, NotificationRepository]), forwardRef(() => UsersModule)],
  providers: [
    NotificationService,
    NotificationQueryResolver,
    NotificationFieldResolver,
    NotificationSubscriptionResolver,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
