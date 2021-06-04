import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/common.decorator";
import { GqlAuthGuard } from "src/guards/gql-auth.guard";
import {
  TinderMatch,
  TinderMatchConnection,
} from "src/modules/tinder/entities/match.entity";
import { TinderMatchService } from "src/modules/tinder/services/tinder_match.service";
import { User } from "src/modules/users/entities/users.entity";

@Resolver(() => TinderMatch)
export class TinderMatchQueryResolver {
  constructor(private readonly tinderMatchService: TinderMatchService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => TinderMatchConnection)
  async myTinderMatches(
    @CurrentUser() user: User,
    @Args("limit") limit: number,
    @Args("page") page: number
  ) {
    return await this.tinderMatchService.myTinderMatches(user.id, limit, page);
  }
}
