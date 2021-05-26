import { Injectable, Scope } from "@nestjs/common";
import DataLoader from "dataloader";
import { GroupMember } from "src/modules/group/entities/group_member.entity";
import { GroupMemberRepository } from "src/modules/group/repositories/group_member.repository";

@Injectable({ scope: Scope.REQUEST })
export class GroupMemberDataloader extends DataLoader<number, GroupMember> {
  constructor(private readonly groupMemberRepository: GroupMemberRepository) {
    super(async (ids: ReadonlyArray<number>) => {
      const rows = await this.groupMemberRepository.findByIds([...ids]);
      return ids.map(
        (id) => rows.find((x) => x.id == id) || new Error("Not found")
      );
    });
  }
}
