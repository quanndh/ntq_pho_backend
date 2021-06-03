import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreatePostOptionDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  content: string;

  @Field(() => [Number])
  voted?: number[];
}

@InputType()
export class UpdatePostOptionDto extends CreatePostOptionDto {
  @Field()
  @IsNumber()
  id: number;
}
