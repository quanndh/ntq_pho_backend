import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/common.decorator";
import { GqlAuthGuard } from "src/guards/gql-auth.guard";
import { TinderProfile } from "src/modules/tinder/entities/tinder_profile.entity";
import { TinderProfileService } from "src/modules/tinder/services/tinder_profile.service";
import { User } from "src/modules/users/entities/users.entity";

@Resolver(() => TinderProfile)
export class TinderProfileQueryResolver {
  constructor(private readonly tinderProfileService: TinderProfileService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => TinderProfile)
  async myTinderProfile(@CurrentUser() user: User) {
    return await this.tinderProfileService.findById(user.id);
  }
}
