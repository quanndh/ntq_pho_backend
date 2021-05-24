import { Entity, Column, DeepPartial, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { snowflake } from 'src/helpers/common';

@ObjectType({
  implements: [Node],
})
@Entity({
  name: 'comment',
})
export class Comments implements Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creatorId: number;

  @Column()
  postId: number;

  @Column()
  parentId: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class CommentDeletePayload {
  @Field()
  id: number;

  @Field()
  postId: number
}

@ObjectType()
export class CommentConnection extends PaginationBase(Comments) { }
