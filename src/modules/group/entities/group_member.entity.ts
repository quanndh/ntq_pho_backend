import { ObjectType } from "@nestjs/graphql";
import {
  Node,
  PaginationBase,
} from "src/graphql/types/common.interface.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType({
  implements: [Node],
})
@Entity({
  name: "group_members",
})
export class GroupMember extends BaseEntity implements Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  groupId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class GroupMemberConnection extends PaginationBase(GroupMember) {}
