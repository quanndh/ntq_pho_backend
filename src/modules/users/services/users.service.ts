/* eslint-disable security/detect-object-injection */
import { Injectable } from "@nestjs/common";
import { DeepPartial } from "typeorm";
import { UserRepository } from "../repositories/users.repository";
import { User, UserConnection } from "../entities/users.entity";
import { createPaginationObject } from "src/modules/common/common.repository";
import { ApolloError } from "apollo-server";
import { ElasticService } from "src/modules/elastic/elastic.service";
import { ElasticDocument } from "src/modules/elastic/elastic.constants";
import { ApiResponse } from "@elastic/elasticsearch";
import { Context, RequestEvent } from "@elastic/elasticsearch/lib/Transport";

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly elasticService: ElasticService
  ) {}

  create = async (data: DeepPartial<User>) => {
    try {
      const user = this.userRepository.create(data);
      const newUser = await this.userRepository.save(user);
      await this.elasticService.index<User>({
        index: ElasticDocument.user,
        id: `${ElasticDocument.user}_${newUser.id}`,
        body: newUser,
      });
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (
    userId: number,
    data: DeepPartial<User>
  ): Promise<User | undefined> => {
    await this.userRepository.update(userId, { ...data, isNew: false });

    const user = await this.userRepository.findOneOrFail(userId);
    await this.elasticService.update({
      index: ElasticDocument.user,
      id: `${ElasticDocument.user}_${user.id}`,
      body: user,
    });
    return user;
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
      const a = await this.elasticService.search<User>({
        index: ElasticDocument.user,
        body: {
          from: (page - 1) * limit,
          size: limit,
          query: {
            query_string: {
              default_field: "fullName",
              query: `*${keyword}*`,
            },
          },
          sort: {
            createdAt: { order: "desc" },
          },
        },
      });
      // @ts-ignore
      const total = a.body.hits.total.value;
      // @ts-ignore
      const items = a.body.hits.hits.map((item) => item._source);

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
