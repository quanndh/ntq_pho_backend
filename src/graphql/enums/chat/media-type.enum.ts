import { registerEnumType } from '@nestjs/graphql';

export enum MediaType {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
}

registerEnumType(MediaType, {
  name: 'MediaType',
});
