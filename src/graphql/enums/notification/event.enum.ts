import { registerEnumType } from '@nestjs/graphql';

export enum EvenEnum {
  like = 'like',
  follow = 'follow',
  acceptFollow = 'acceptFollow',
  comment = 'comment',
  tag = 'tag',
}

registerEnumType(EvenEnum, {
  name: 'EvenEnum',
});
