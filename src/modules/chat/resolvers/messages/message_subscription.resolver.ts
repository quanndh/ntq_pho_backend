import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { PubsubEventEnum } from 'src/graphql/enums/pubsub/pubsub_event.enum';
import { pubSub } from 'src/helpers/pubsub';
import { Message, ReceivedMessage, SeenMessage } from 'src/modules/chat/entities/message.entity';

@Resolver(() => Message)
export class MessageSubscriptionResolver {
  @Subscription(() => Message, {
    filter: (payload, vars, context) => {
      return payload.onNewMessage.chatId === vars.chatId;
    },
  })
  onNewMessage(@Args('chatId') chatId: number) {
    return pubSub.asyncIterator(PubsubEventEnum.onNewMessage);
  }

  @Subscription(() => SeenMessage, {
    filter: (payload, vars, context) => {
      return payload.onSeenMessage.chatId === vars.chatId
    }
  })
  onSeenMessage(@Args("chatId") chatId: number) {
    return pubSub.asyncIterator(PubsubEventEnum.onSeenMessage)
  }

  @Subscription(() => ReceivedMessage, {
    filter: (payload, vars, context) => {
      console.log(payload.onReceiveMessage.userId, vars.userId)
      return payload.onReceiveMessage.userId === vars.userId
    }
  })
  onReceiveMessage(@Args("userId") userId: number) {
    return pubSub.asyncIterator(PubsubEventEnum.onReceiveMessage)
  }
}
