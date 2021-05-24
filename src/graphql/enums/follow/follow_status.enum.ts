import { registerEnumType } from '@nestjs/graphql';

export enum FollowStatus {
  IS_ME = 'IS_ME',
  WAITING = 'Waiting',
  ACCEPT = 'Accept',
}

registerEnumType(FollowStatus, {
  name: 'FollowStatus',
});
