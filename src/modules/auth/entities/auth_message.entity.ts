import { ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'AuthMessage',
})
export class AuthMessage {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}
