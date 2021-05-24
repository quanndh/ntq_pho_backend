import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserRegister {
  @Field()
  nickname?: string;

  @Field({ nullable: true })
  zaloCode: string;
}
