import { Field, InputType } from "@nestjs/graphql";
import { UserDepartmentEnum } from "src/graphql/enums/users/user_department.enum";
import { CreatePostOptionDto } from "src/modules/post/dtos/post_option.input";

@InputType()
export class CreatePostInput {
  @Field(() => [Number], { nullable: true, defaultValue: [] })
  medias?: number[];

  @Field({ defaultValue: "" })
  caption: string;

  @Field({ nullable: true })
  groupId?: number;

  @Field({ nullable: true })
  department?: UserDepartmentEnum;

  @Field({ defaultValue: false })
  isPinned?: boolean;

  @Field(() => [CreatePostOptionDto])
  options?: CreatePostOptionDto[];
}

@InputType()
export class UpdatePostInput extends CreatePostInput {
  @Field()
  id: number;
}
