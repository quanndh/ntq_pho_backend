import { Resolver, Args, Mutation } from "@nestjs/graphql";
import { UsersService } from "../services/users.service";
import { User } from "../entities/users.entity";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard, GqlCookieAuthGuard } from "src/guards/gql-auth.guard";
import { CurrentUser } from "src/decorators/common.decorator";
import { UpdateUserInput } from "../dto/new_user.input";
@Resolver(() => User)
export class UsersMutationResolver {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUserInfo(
    @CurrentUser() user: User,
    @Args("input") input: UpdateUserInput
  ): Promise<User | undefined> {
    return await this.userService.update(user.id, input);
  }

  @Mutation(() => User)
  async test(): Promise<User | undefined> {
    return await this.userService.create({
      lastName: "quan",
      firstName: "nguyen",
      fullName: "quan nguyen",
      googleId: "2",
      nickname: "quannguyen2",
    });
  }
}
