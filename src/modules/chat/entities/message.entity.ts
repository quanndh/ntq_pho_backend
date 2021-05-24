import { Field, ObjectType } from '@nestjs/graphql';
import { MediaType } from 'src/graphql/enums/chat/media-type.enum';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({
  implements: [Node],
})
@Entity({
  name: 'messages',
})
export class Message implements Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender: number;

  @Column()
  chatId: number;

  @Column({ nullable: true })
  content?: string;

  @Column({ nullable: true })
  media?: string;

  @Column({ nullable: true, enum: MediaType })
  mediaType?: MediaType;

  @Column({ default: false })
  sent: boolean;

  @Column({ nullable: true })
  tempId: string;

  @Column({ default: false })
  received: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

@ObjectType()
export class MessageConnection extends PaginationBase(Message) {}

@ObjectType()
export class SeenMessage {
  @Field()
  chatId: number;

  @Field()
  userId: number;
}

@ObjectType()
export class ReceivedMessage {
  @Field()
  chatId: number;

  @Field()
  userId: number;

  @Field(() => Message)
  message: Message;
}
