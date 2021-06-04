import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/common.decorator";
import { GqlAuthGuard } from "src/guards/gql-auth.guard";
import { TinderMatch } from "src/modules/tinder/entities/match.entity";
import { TinderMatchService } from "src/modules/tinder/services/tinder_match.service";
import { User } from "src/modules/users/entities/users.entity";

@Resolver(() => TinderMatch)
export class TinderMatchMutationResolver {
  constructor(private readonly tinderMatchService: TinderMatchService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => TinderMatch)
  async swipeRight(
    @CurrentUser() user: User,
    @Args("targetUser") targetUser: number
  ) {
    return await this.tinderMatchService.swipeRight(user.id, targetUser);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async unmatch(@CurrentUser() user: User, @Args("id") id: number) {
    return await this.tinderMatchService.delete(user.id, id);
  }
}
