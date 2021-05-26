import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { ObjectType, Field, HideField } from "@nestjs/graphql";
import {
  Node,
  PaginationBase,
} from "src/graphql/types/common.interface.entity";
import { UserDepartmentEnum } from "src/graphql/enums/users/user_department.enum";
import { UserPositionEnum } from "src/graphql/enums/users/user_position.enum";
@ObjectType({
  implements: [Node],
})
@Entity({
  name: "users",
})
export class User implements Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fullName: string;

  @Column({ length: 50 })
  nickname: string;

  @Column({ nullable: true, type: "tsvector" })
  @Index()
  @HideField()
  documentIdx: string;

  @Column({ nullable: true })
  intro?: string;

  @Column({ unique: true, nullable: true })
  googleId: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ default: true })
  isNew: boolean;

  @Column({ nullable: true })
  lastSeen?: Date;

  @Column({ enum: UserDepartmentEnum, nullable: true })
  department?: UserDepartmentEnum;

  @Column({ enum: UserPositionEnum, nullable: true })
  position?: UserPositionEnum;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt", nullable: true })
  updatedAt: Date;
}

@ObjectType()
export class UserConnection extends PaginationBase(User) {}

@ObjectType()
export class FrequentUser extends User {
  @Field({ defaultValue: 0, nullable: true })
  totalOrder?: number;
}
