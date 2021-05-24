import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { PubsubEventEnum } from 'src/graphql/enums/pubsub/pubsub_event.enum';
import { pubSub } from 'src/helpers/pubsub';
import { CommentDeletePayload, Comments } from 'src/modules/comment/entities/comment.entity';

@Resolver(() => Comments)
export class CommentSubcriptionResolver {
  @Subscription(() => Comments, {
    filter: (payload, vars, context) => {
      return payload.onCreateComment.postId === vars.postId;
    },
  })
  onCreateComment(@Args('postId') postId: number) {
    return pubSub.asyncIterator(PubsubEventEnum.onCreateComment);
  }

  @Subscription(() => CommentDeletePayload, {
    filter: (payload, vars, context) => {
      return payload.onDeleteComment.postId === vars.postId;
    },
  })
  onDeleteComment(@Args('postId') postId: number) {
    return pubSub.asyncIterator(PubsubEventEnum.onDeleteComment);
  }
}
