import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/common.decorator";
import { GqlAuthGuard } from "src/guards/gql-auth.guard";
import {
  CreateTinderProfileDto,
  UpdateTinderProfileDto,
} from "src/modules/tinder/dtos/tinder_profile.dto";
import { TinderProfile } from "src/modules/tinder/entities/tinder_profile.entity";
import { TinderProfileService } from "src/modules/tinder/services/tinder_profile.service";
import { User } from "src/modules/users/entities/users.entity";

@Resolver(() => TinderProfile)
export class TinderProfileMutationResolver {
  constructor(private readonly tinderProfileService: TinderProfileService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => TinderProfile)
  async createTinderProfile(
    @CurrentUser() user: User,
    @Args({ name: "input", type: () => CreateTinderProfileDto })
    input: CreateTinderProfileDto
  ) {
    return await this.tinderProfileService.create(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => TinderProfile)
  async updateTinderProfile(
    @CurrentUser() user: User,
    @Args({ name: "input", type: () => UpdateTinderProfileDto })
    input: UpdateTinderProfileDto
  ) {
    return await this.tinderProfileService.update(user.id, input);
  }
}
