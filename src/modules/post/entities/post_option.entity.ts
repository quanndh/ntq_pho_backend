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
  name: "post_options",
})
export class PostOption extends BaseEntity implements Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column()
  content: string;

  @Column("text", { array: true, default: "{}" })
  voted: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class PostOptionConnection extends PaginationBase(PostOption) {}
