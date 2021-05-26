import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateGroupDto {
  @Field()
  name: string;
}

@InputType()
export class UpdateGroupDto extends CreateGroupDto {
  @Field()
  id: number;

  @Field(() => [Number])
  administrator?: number[];
}
