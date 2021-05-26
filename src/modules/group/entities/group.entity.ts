import { HideField, ObjectType } from "@nestjs/graphql";
import {
  Node,
  PaginationBase,
} from "src/graphql/types/common.interface.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType("Group", {
  implements: [Node],
})
@Entity({
  name: "groups",
})
export class Group extends BaseEntity implements Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: "tsvector" })
  @Index()
  @HideField()
  nameIdx: string;

  @Column()
  @Index()
  name: string;

  @Column("text", { array: true })
  administrators: number[];

  @Column()
  creator: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class GroupConnection extends PaginationBase(Group) {}
