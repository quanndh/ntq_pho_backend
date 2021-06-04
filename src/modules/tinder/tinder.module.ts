import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TinderProfileDataloader } from "src/modules/tinder/dataloaders/tinder_profile.dataloader";
import { TinderMatch } from "src/modules/tinder/entities/match.entity";
import { TinderProfile } from "src/modules/tinder/entities/tinder_profile.entity";
import { TinderMatchRepository } from "src/modules/tinder/repositories/match.repository";
import { TinderProfileRepository } from "src/modules/tinder/repositories/tinder_profile.repository";
import { TinderMatchFieldResolver } from "src/modules/tinder/resolvers/tinder_match/tinder_match.field";
import { TinderMatchMutationResolver } from "src/modules/tinder/resolvers/tinder_match/tinder_match.mutation";
import { TinderMatchQueryResolver } from "src/modules/tinder/resolvers/tinder_match/tinder_match.query";
import { TinderProfileFieldResolver } from "src/modules/tinder/resolvers/tinder_profile/tinder_profile.field";
import { TinderProfileMutationResolver } from "src/modules/tinder/resolvers/tinder_profile/tinder_profile.mutation";
import { TinderProfileQueryResolver } from "src/modules/tinder/resolvers/tinder_profile/tinder_profile.query";
import { TinderMatchService } from "src/modules/tinder/services/tinder_match.service";
import { TinderProfileService } from "src/modules/tinder/services/tinder_profile.service";
import { UsersModule } from "src/modules/users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TinderProfile,
      TinderProfileRepository,
      TinderMatch,
      TinderMatchRepository,
    ]),
    forwardRef(() => UsersModule),
  ],
  exports: [TinderProfileService, TinderMatchService, TinderProfileDataloader],
  providers: [
    TinderProfileService,
    TinderMatchService,
    TinderProfileQueryResolver,
    TinderProfileMutationResolver,
    TinderProfileFieldResolver,
    TinderProfileDataloader,
    TinderMatchQueryResolver,
    TinderMatchFieldResolver,
    TinderMatchMutationResolver,
  ],
})
export class TinderModule {}
