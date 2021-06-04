import { Injectable } from "@nestjs/common";
import { ApolloError } from "apollo-server-errors";
import { createPaginationObject } from "src/modules/common/common.repository";
import { TinderProfile } from "src/modules/tinder/entities/tinder_profile.entity";
import { TinderProfileRepository } from "src/modules/tinder/repositories/tinder_profile.repository";
import { TinderMatchService } from "src/modules/tinder/services/tinder_match.service";
import { DeepPartial, In, Not } from "typeorm";

@Injectable()
export class TinderProfileService {
  constructor(
    private readonly tinderProfileRepo: TinderProfileRepository,
    private readonly tinderMatchService: TinderMatchService
  ) {}

  getProfiles = async (userId: number, limit: number, page: number) => {
    try {
      const query = await this.tinderProfileRepo.createQueryBuilder("profiles");
      const swipedOrMatchedProfileIds = await this.tinderMatchService.tinderMatchService(
        userId
      );

      if (swipedOrMatchedProfileIds.length) {
        query.where("profiles.userId NOT IN (:...users)", {
          users: swipedOrMatchedProfileIds,
        });
      }

      const [items, total] = await query
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy("RANDOM()")
        .getManyAndCount();

      return createPaginationObject(items, total, page, limit);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  findById = async (userId: number) => {
    try {
      return await this.tinderProfileRepo.findOne({ userId });
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  create = async (userId: number, data: DeepPartial<TinderProfile>) => {
    try {
      const newProfile = this.tinderProfileRepo.create({ userId, ...data });
      return await this.tinderProfileRepo.save(newProfile);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  update = async (userId: number, data: DeepPartial<TinderProfile>) => {
    try {
      await this.tinderProfileRepo.update({ userId }, { ...data });
      return await this.tinderProfileRepo.findOne({ userId });
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };
}
