import { ObjectType } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({
  implements: [Node],
})
@Entity({
  name: 'reports',
})
export class Report implements Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;
}

@ObjectType()
export class ReportPostConnection extends PaginationBase(Report) {}
