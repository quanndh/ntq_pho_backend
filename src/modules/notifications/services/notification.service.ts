import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { EvenEnum } from 'src/graphql/enums/notification/event.enum';
import { PubsubEventEnum } from 'src/graphql/enums/pubsub/pubsub_event.enum';
import { pubSub } from 'src/helpers/pubsub';
import { createPaginationObject } from 'src/modules/common/common.repository';
import { NotificationRepository } from 'src/modules/notifications/repositories/notification.repository';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class NotificationService {
  constructor(private readonly notiRepo: NotificationRepository) { }

  create = async (triggerId: number, userId: number, event: EvenEnum, link: string) => {
    try {
      let content = '';

      if (event === EvenEnum.like) {
        content = `liked your post`;
      } else if (event === EvenEnum.comment) {
        content = `commented on your post`;
      } else if (event === EvenEnum.follow) {
        content = `requested to follow you`;
      } else if (event === EvenEnum.acceptFollow) {
        content = `accepted your follow request`;
      } else if (event === EvenEnum.tag) {
        content = `mentioned you in a post`;
      }

      const [, id] = link.split('-');

      const oldNotification = await this.notiRepo.findOne({
        triggerId,
        userId,
        link,
        type: event,
        resourceId: id,
      });

      if (oldNotification) {
        const { createdAt, updatedAt, ...rest } = oldNotification;
        await this.notiRepo.update({ id: oldNotification.id }, { ...rest, isSeen: false });
        const updated = await this.notiRepo.findOne({ triggerId, userId, content, link, type: event, resourceId: id });
        void pubSub.publish(PubsubEventEnum.onNewNotification, { onNewNotification: updated });
        return updated;
      } else {
        const newNotification = this.notiRepo.create({ triggerId, userId, content, link, type: event, resourceId: id });
        const savedNoti = await this.notiRepo.save(newNotification);
        void pubSub.publish(PubsubEventEnum.onNewNotification, { onNewNotification: savedNoti });
        return savedNoti;
      }
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  find = async (userId: number, limit: number, page: number) => {
    const [items, total] = await this.notiRepo.findAndCount({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
      order: { updatedAt: 'DESC' },
    });
    return createPaginationObject(items, total, page, limit);
  };

  setSeen = async (userId: number) => {
    await this.notiRepo.update({ userId }, { isSeen: true, updatedAt: () => '"updatedAt"' });
    return true;
  };

  countUnseen = async (userId: number) => {
    return await this.notiRepo.count({ userId, isSeen: false });
  };
}
