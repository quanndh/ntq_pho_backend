import { Injectable } from "@nestjs/common";
import { ApolloError } from "apollo-server-errors";
import { TinderMatchStatus } from "src/graphql/enums/tinder/tinder_status.enum";
import { createPaginationObject } from "src/modules/common/common.repository";
import { TinderMatch } from "src/modules/tinder/entities/match.entity";
import { TinderMatchRepository } from "src/modules/tinder/repositories/match.repository";
import { DeepPartial } from "typeorm";

@Injectable()
export class TinderMatchService {
  constructor(private readonly tinderMatchRepo: TinderMatchRepository) {}

  tinderMatchService = async (userId: number) => {
    try {
      const matches = await this.tinderMatchRepo.find({ initiator: userId });
      return matches.map((item) => item.targetUser);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  myTinderMatches = async (userId: number, limit: number, page: number) => {
    try {
      const [items, total] = await this.tinderMatchRepo
        .createQueryBuilder("matches")
        .where("(matches.initiator = :userId AND status = :status)", {
          userId,
          status: TinderMatchStatus.MATCHED,
        })
        .orWhere("(matches.targetUser = :userId AND isSuper = true)", {
          userId,
        })
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy("matches.createdAt", "DESC")
        .getManyAndCount();

      return createPaginationObject(items, total, page, limit);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  swipeRight = async (initiator: number, targetUser: number) => {
    try {
      const requestedMatchFromTarget = await this.getMatchOfUsers(
        targetUser,
        initiator
      );

      if (requestedMatchFromTarget) {
        await this.update({
          ...requestedMatchFromTarget,
          status: TinderMatchStatus.MATCHED,
        });
      }

      return await this.create({ initiator, targetUser });
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  create = async (data: DeepPartial<TinderMatch>) => {
    try {
      const newRequest = this.tinderMatchRepo.create({ ...data });
      return await this.tinderMatchRepo.save(newRequest);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  update = async (data: DeepPartial<TinderMatch>) => {
    try {
      if (!data.id) throw new ApolloError("Thiếu Id");
      await this.tinderMatchRepo.update({ id: data.id }, { ...data });
      return await this.tinderMatchRepo.findOne(data.id);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  delete = async (userId: number, id: number) => {
    try {
      const match = await this.tinderMatchRepo.findOne(id);
      if (match?.targetUser !== userId && match?.initiator !== userId) {
        throw new ApolloError("Không thể xoá tương hợp này");
      }

      await this.tinderMatchRepo.delete(id);
      return true;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  getMatchOfUsers = async (initiator: number, targetUser: number) => {
    try {
      return await this.tinderMatchRepo.findOne({
        initiator,
        targetUser,
        status: TinderMatchStatus.REQUEST,
      });
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };
}
