import { Injectable } from "@nestjs/common";
import { ApolloError } from "apollo-server-errors";
import { createPaginationObject } from "src/modules/common/common.repository";
import { UpdateGroupDto } from "src/modules/group/dtos/group.dtos";
import { Group } from "src/modules/group/entities/group.entity";
import { GroupMember } from "src/modules/group/entities/group_member.entity";
import { GroupRepository } from "src/modules/group/repositories/group.repository";
import { GroupMemberService } from "src/modules/group/services/group_member.service";
import { DeepPartial } from "typeorm";

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepo: GroupRepository,
    private readonly groupMemberService: GroupMemberService
  ) {}

  findOne = async (id: number) => {
    try {
      const group = await this.groupRepo.findOne(id);
      if (!group) throw new ApolloError("Nhóm không còn tồn tại");
      return group;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  createGroup = async (creator: number, input: DeepPartial<Group>) => {
    try {
      const newGroup = this.groupRepo.create({
        creator,
        administrators: [creator],
        nameIdx: input.name?.toLowerCase(),
        ...input,
      });
      return await this.groupRepo.save(newGroup);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  updateGroup = async (userId: number, input: UpdateGroupDto) => {
    try {
      await this.checkForGroupAuthorization(userId, input.id);
      await this.groupRepo.update({ id: input.id }, { ...input });
      return await this.groupRepo.findOne(input.id);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  deleteGroup = async (userId: number, id: number) => {
    try {
      await this.checkForGroupAuthorization(userId, id, true);
      await this.groupMemberService.deleteAllMember(id);
      await this.groupRepo.delete(id);
      return id;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  checkForGroupAuthorization = async (
    userId: number,
    groupId: number,
    higherAuthorization: boolean = false
  ) => {
    try {
      const group = await this.groupRepo.findOne(groupId);
      if (!group) throw new ApolloError("Không tìm thấy nhóm");
      if (!higherAuthorization) {
        if (group.administrators.includes(userId)) return true;
      } else {
        if (userId === group.creator) return true;
      }
      throw new ApolloError(
        "Tài khoản của bạn không có quyền thực hiện chức năng này"
      );
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  myGroup = async (userId: number, limit: number, page: number) => {
    try {
      const query = this.groupRepo
        .createQueryBuilder("group")
        .innerJoin(
          GroupMember,
          "group_member",
          "group_member.groupId = group.id"
        );

      const [items, total] = await query
        .where("group_member.userId = :userId", { userId })
        .orderBy("group_member.createdAt", "DESC")
        .offset((page - 1) * limit)
        .limit(limit)
        .getManyAndCount();

      return createPaginationObject(items, total, page, limit);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  searchGroup = async (search: string, limit: number, page: number) => {
    try {
      const query = this.groupRepo.createQueryBuilder("group");

      if (search.length) {
        query.where("group.nameIdx @@ to_tsquery(:search)", {
          search: `${search}:*`,
        });
      }

      const [items, total] = await query
        .orderBy(`ts_rank(group.nameIdx, to_tsquery('${search}:*'))`, "DESC")
        .offset((page - 1) * limit)
        .limit(limit)
        .getManyAndCount();

      return createPaginationObject(items, total, page, limit);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };
}
