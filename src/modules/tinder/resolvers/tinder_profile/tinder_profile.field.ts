import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { TinderProfile } from "src/modules/tinder/entities/tinder_profile.entity";
import { UserDataLoader } from "src/modules/users/dataloaders/users.dataloader";
import { User } from "src/modules/users/entities/users.entity";

@Resolver(() => TinderProfile)
export class TinderProfileFieldResolver {
  constructor(private readonly userDataloader: UserDataLoader) {}

  @ResolveField(() => User)
  async userInfo(@Parent() tinderProfile: TinderProfile) {
    return await this.userDataloader.load(tinderProfile.userId);
  }
}
