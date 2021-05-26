import { Injectable, Scope } from "@nestjs/common";
import DataLoader from "dataloader";
import { Group } from "src/modules/group/entities/group.entity";
import { GroupRepository } from "src/modules/group/repositories/group.repository";

@Injectable({ scope: Scope.REQUEST })
export class GroupDataloader extends DataLoader<number, Group> {
  constructor(private readonly groupRepository: GroupRepository) {
    super(async (ids: ReadonlyArray<number>) => {
      const rows = await this.groupRepository.findByIds([...ids]);
      return ids.map(
        (id) => rows.find((x) => x.id == id) || new Error("Not found")
      );
    });
  }
}
