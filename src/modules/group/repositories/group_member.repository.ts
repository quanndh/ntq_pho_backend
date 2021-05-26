import { CommonRepository } from "src/modules/common/common.repository";
import { GroupMember } from "src/modules/group/entities/group_member.entity";
import { EntityRepository } from "typeorm";

@EntityRepository(GroupMember)
export class GroupMemberRepository extends CommonRepository<GroupMember> {}
