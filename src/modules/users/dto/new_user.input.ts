import { Field, InputType } from "@nestjs/graphql";
import { UserDepartmentEnum } from "src/graphql/enums/users/user_department.enum";
import { UserPositionEnum } from "src/graphql/enums/users/user_position.enum";

@InputType()
export class LoginSNSInput {
  @Field()
  token: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  intro?: string;

  @Field(() => UserDepartmentEnum, { nullable: true })
  department: UserDepartmentEnum;

  @Field(() => UserPositionEnum, { nullable: true })
  position: UserPositionEnum;
}
