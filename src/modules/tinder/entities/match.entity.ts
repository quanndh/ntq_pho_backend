import { ObjectType } from "@nestjs/graphql";
import { TinderMatchStatus } from "src/graphql/enums/tinder/tinder_status.enum";
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
  name: "tinder_matches",
})
export class TinderMatch extends BaseEntity implements Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  initiator: number;

  @Column()
  targetUser: number;

  @Column({ enum: TinderMatchStatus })
  status: TinderMatchStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class TinderMatchConnection extends PaginationBase(TinderMatch) {}
