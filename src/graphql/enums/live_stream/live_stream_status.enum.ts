import { registerEnumType } from '@nestjs/graphql';

export enum LiveStreamStatusEnum {
  IDLE,
  ACTIVE,
  STOP,
}

registerEnumType(LiveStreamStatusEnum, {
  name: 'LiveStreamStatusEnum',
});
