import { CommonRepository } from "src/modules/common/common.repository";
import { Group } from "src/modules/group/entities/group.entity";
import { EntityRepository } from "typeorm";

@EntityRepository(Group)
export class GroupRepository extends CommonRepository<Group> {}
