import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginEmailInput {
  @Field()
  @IsNotEmpty()
  email: string;
}
