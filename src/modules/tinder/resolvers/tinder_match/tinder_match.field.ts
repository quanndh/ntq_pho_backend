import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { TinderProfileDataloader } from "src/modules/tinder/dataloaders/tinder_profile.dataloader";
import { TinderMatch } from "src/modules/tinder/entities/match.entity";
import { TinderProfile } from "src/modules/tinder/entities/tinder_profile.entity";

@Resolver(() => TinderMatch)
export class TinderMatchFieldResolver {
  constructor(
    private readonly tinderProfileDataloader: TinderProfileDataloader
  ) {}

  @ResolveField(() => TinderProfile)
  async targetUserInfo(@Parent() tinderMatch: TinderMatch) {
    return await this.tinderProfileDataloader.load(tinderMatch.targetUser);
  }

  @ResolveField(() => TinderProfile)
  async initiatorUserInfo(@Parent() tinderMatch: TinderMatch) {
    return await this.tinderProfileDataloader.load(tinderMatch.initiator);
  }
}
