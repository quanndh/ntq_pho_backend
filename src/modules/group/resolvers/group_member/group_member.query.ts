import { Resolver } from "@nestjs/graphql";
import { GroupMember } from "src/modules/group/entities/group_member.entity";

@Resolver(() => GroupMember)
export class GroupMemberQueryResolver {}
