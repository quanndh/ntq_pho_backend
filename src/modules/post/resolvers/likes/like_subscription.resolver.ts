import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { PubsubEventEnum } from 'src/graphql/enums/pubsub/pubsub_event.enum';
import { pubSub } from 'src/helpers/pubsub';
import { Like } from 'src/modules/post/entities/like.entity';

@Resolver(() => Like)
export class LikeSubscriptionResolver {
  @Subscription(() => Like, {
    filter: (payload, vars, context) => {
      return payload.onLikePost.postId === vars.postId;
    },
  })
  onLikePost(@Args('postId') postId: number) {
    return pubSub.asyncIterator(PubsubEventEnum.onLikePost);
  }

  @Subscription(() => Like, {
    filter: (payload, vars, context) => {
      return payload.onUnLikePost.postId === vars.postId;
    },
  })
  onUnLikePost(@Args('postId') postId: number) {
    return pubSub.asyncIterator(PubsubEventEnum.onUnLikePost);
  }
}
