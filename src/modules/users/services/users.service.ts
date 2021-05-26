/* eslint-disable security/detect-object-injection */
import { Injectable } from "@nestjs/common";
import { DeepPartial } from "typeorm";
import { UserRepository } from "../repositories/users.repository";
import { User, UserConnection } from "../entities/users.entity";
import { createPaginationObject } from "src/modules/common/common.repository";
import { ApolloError } from "apollo-server";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  create = async (data: DeepPartial<User>) => {
    try {
      const user = this.userRepository.create({
        ...data,
        documentIdx: data.fullName?.toLowerCase(),
      });
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (
    userId: number,
    data: DeepPartial<User>
  ): Promise<User | undefined> => {
    await this.userRepository.update(userId, { ...data, isNew: false });

    return await this.userRepository.findOneOrFail(userId);
  };

  findById = async (id: number): Promise<User | undefined> => {
    return this.userRepository.findOne({ where: { id } });
  };

  find = (data: DeepPartial<User>): Promise<User | undefined> => {
    return this.userRepository.findOne(data);
  };

  findWhere = (data): Promise<User | undefined> => {
    return this.userRepository.findOne(data);
  };

  searchUser = async (
    keyword: string,
    limit: number,
    page: number
  ): Promise<UserConnection> => {
    try {
      const [items, total] = await this.userRepository
        .createQueryBuilder("user")
        .where("user.documentIdx @@ to_tsquery(:search)", {
          search: `${keyword}:*`,
        })
        .offset((page - 1) * limit)
        .limit(limit)
        .orderBy(
          `ts_rank(user.documentIdx, to_tsquery('${keyword}:*'))`,
          "DESC"
        )
        .getManyAndCount();

      return createPaginationObject(items, total, page, limit);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  getAllUser = async (limit: number, page: number): Promise<UserConnection> => {
    const [items, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: "DESC" },
    });
    return createPaginationObject(items, total, page, limit);
  };
}
