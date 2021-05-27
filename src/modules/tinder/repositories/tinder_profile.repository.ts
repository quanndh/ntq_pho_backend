import { CommonRepository } from "src/modules/common/common.repository";
import { TinderProfile } from "src/modules/tinder/entities/tinder_profile.entity";
import { EntityRepository } from "typeorm";

@EntityRepository(TinderProfile)
export class TinderProfileRepository extends CommonRepository<TinderProfile> {}
