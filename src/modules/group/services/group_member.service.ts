import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ApolloError } from "apollo-server-errors";
import { GroupMemberRepository } from "src/modules/group/repositories/group_member.repository";
import { GroupService } from "src/modules/group/services/group.service";

@Injectable()
export class GroupMemberService {
  constructor(
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
    private readonly groupMemberRepo: GroupMemberRepository
  ) {}

  joinGroup = async (userId: number, groupId: number) => {
    try {
      const isInGroup = await this.groupMemberRepo.findOne({ userId, groupId });

      if (isInGroup !== null) throw new ApolloError("Đã ở trong nhóm");

      const group = await this.groupService.findOne(groupId);

      const newMember = this.groupMemberRepo.create({
        userId,
        groupId: group.id,
      });
      return await this.groupMemberRepo.save(newMember);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  leaveGroup = async (userId: number, groupId: number) => {
    try {
      const group = await this.groupService.findOne(groupId);

      if (group.creator === userId)
        throw new ApolloError(
          "Vui lòng chuyển quyền điều hành cho người khác trước khi rời nhóm"
        );

      await this.groupMemberRepo.delete({ userId, groupId });
      return true;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  deleteAllMember = async (groupId: number) => {
    try {
      await this.groupMemberRepo.delete({ groupId });
      return true;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };
}
