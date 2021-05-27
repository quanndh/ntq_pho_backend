import { CommonRepository } from "src/modules/common/common.repository";
import { TinderMatch } from "src/modules/tinder/entities/match.entity";
import { EntityRepository } from "typeorm";

@EntityRepository(TinderMatch)
export class TinderMatchRepository extends CommonRepository<TinderMatch> {}
