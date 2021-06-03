import { Field, InputType, PartialType } from "@nestjs/graphql";
import { TinderGenderEnum } from "src/graphql/enums/tinder/tinder_gender.enum";

@InputType()
export class CreateTinderProfileDto {
  @Field(() => [String])
  images?: string[];

  @Field(() => TinderGenderEnum)
  gender?: TinderGenderEnum;

  @Field(() => TinderGenderEnum)
  target?: TinderGenderEnum;

  @Field()
  intro?: string;
}

@InputType()
export class UpdateTinderProfileDto extends CreateTinderProfileDto {}
