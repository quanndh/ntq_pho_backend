import { Field, InputType } from "@nestjs/graphql";
import { UserDepartmentEnum } from "src/graphql/enums/users/user_department.enum";

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
}

@InputType()
export class UpdatePostInput extends CreatePostInput {
  @Field()
  id: number;
}
