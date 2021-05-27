import { ObjectType } from "@nestjs/graphql";
import { TinderGenderEnum } from "src/graphql/enums/tinder/tinder_gender.enum";
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
  name: "tinder_profiles",
})
export class TinderProfile extends BaseEntity implements Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { array: true })
  images: string[];

  @Column({ enum: TinderGenderEnum })
  gender: TinderGenderEnum;

  @Column({ enum: TinderGenderEnum })
  target: TinderGenderEnum;

  @Column()
  intro: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class TinderProfileConnection extends PaginationBase(TinderProfile) {}
