import { ObjectType } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType({
  implements: [Node],
})
@Entity({
  name: 'chat',
})
export class Chat implements Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  participants: number[];

  @Column({ default: true })
  isTemp: boolean;

  @Column({ nullable: true })
  lastMessage?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class ChatConnection extends PaginationBase(Chat) {}
