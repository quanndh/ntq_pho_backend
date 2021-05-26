import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupDataloader } from "src/modules/group/dataloaders/group.dateloader";
import { GroupMemberDataloader } from "src/modules/group/dataloaders/group_member.dataloaders";
import { Group } from "src/modules/group/entities/group.entity";
import { GroupMember } from "src/modules/group/entities/group_member.entity";
import { GroupRepository } from "src/modules/group/repositories/group.repository";
import { GroupMemberRepository } from "src/modules/group/repositories/group_member.repository";
import { GroupMutationResolver } from "src/modules/group/resolvers/group/group_mutation";
import { GroupQueryResolver } from "src/modules/group/resolvers/group/group_query";
import { GroupMemberQueryResolver } from "src/modules/group/resolvers/group_member/group_member.query";
import { GroupService } from "src/modules/group/services/group.service";
import { GroupMemberService } from "src/modules/group/services/group_member.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Group,
      GroupRepository,
      GroupMember,
      GroupMemberRepository,
    ]),
  ],
  exports: [
    GroupService,
    GroupMemberService,
    GroupDataloader,
    GroupMemberDataloader,
  ],
  providers: [
    GroupService,
    GroupMemberService,
    GroupDataloader,
    GroupMemberDataloader,
    GroupMutationResolver,
    GroupQueryResolver,
    GroupMemberQueryResolver,
  ],
})
export class GroupModule {}
