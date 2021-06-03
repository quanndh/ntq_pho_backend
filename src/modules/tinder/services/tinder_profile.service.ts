import { Injectable } from "@nestjs/common";
import { ApolloError } from "apollo-server-errors";
import { TinderProfile } from "src/modules/tinder/entities/tinder_profile.entity";
import { TinderProfileRepository } from "src/modules/tinder/repositories/tinder_profile.repository";
import { DeepPartial } from "typeorm";

@Injectable()
export class TinderProfileService {
  constructor(private readonly tinderProfileRepo: TinderProfileRepository) {}

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
