import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-errors';
import { EvenEnum } from 'src/graphql/enums/notification/event.enum';
import { PubsubEventEnum } from 'src/graphql/enums/pubsub/pubsub_event.enum';
import { pubSub } from 'src/helpers/pubsub';
import { Constants } from 'src/modules/constant';
import { NotificationService } from 'src/modules/notifications/services/notification.service';
import { PostService } from 'src/modules/post/services/post.service';
import { LikeRepository } from '../repositories/like.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly notificationService: NotificationService,
    private readonly postService: PostService,
  ) { }

  countPostLike = async (postId: number): Promise<number> => {
    return await this.likeRepository.count({ postId });
  };

  isLike = async (userId: number, postId: number): Promise<boolean> => {
    const like = await this.likeRepository.findOne({ userId, postId });
    return like ? true : false;
  };

  reactToPost = async (userId: number, postId: number) => {
    const reaction = await this.likeRepository.findOne({ userId, postId });
    const postInfo = await this.postService.findById(postId);
    if (!postInfo) throw new ApolloError('Not found');
    if (!reaction) {
      const newReact = this.likeRepository.create({ userId, postId });
      const savedReact = await this.likeRepository.save(newReact);
      if (Number(userId) !== Number(postInfo.creatorId)) {
        await this.notificationService.create(userId, postInfo?.creatorId, EvenEnum.like, `post-${postInfo?.id}`);
      }
      void pubSub.publish(PubsubEventEnum.onLikePost, { onLikePost: savedReact });
      await this.postService.updateScore({ postId: postInfo.id, value: Constants.LIKE_SCORE })
    } else {
      void pubSub.publish(PubsubEventEnum.onUnLikePost, { onUnLikePost: reaction });
      await this.likeRepository.delete(reaction.id);
      await this.postService.updateScore({ postId: postInfo.id, value: -Constants.LIKE_SCORE })
    }
    return reaction ? false : true;
  };

  getUserIdLikePost = async (postId: number) => {
    const likes = await this.likeRepository.find({ where: { postId }, order: { createdAt: 'DESC' } });
    return likes.map((like) => like.userId);
  };
}
