import { CommonRepository } from 'src/modules/common/common.repository';
import { Notification } from 'src/modules/notifications/entities/notification.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Notification)
export class NotificationRepository extends CommonRepository<Notification> {}
