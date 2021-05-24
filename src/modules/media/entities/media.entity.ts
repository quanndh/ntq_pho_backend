import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Node, PaginationBase } from 'src/graphql/types/common.interface.entity';
import { FileTypeEnum } from 'src/graphql/enums/file_type';

@ObjectType('Media', {
  implements: [Node],
})
@Entity({
  name: 'media',
})
export class MediaEntity extends BaseEntity implements Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500, nullable: true })
  filePath?: string;

  @Column({ length: 100, nullable: true })
  mimeType?: string;

  @Field(() => Int)
  @Column({ type: 'int4', unsigned: true, nullable: true })
  fileSize?: number;

  @Column({
    default: false,
  })
  isDeleted: boolean;

  @Column({
    type: 'enum',
    default: FileTypeEnum.FILE,
    enum: FileTypeEnum,
  })
  type: FileTypeEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType('MediaConnection')
export class MediaConnection extends PaginationBase(MediaEntity) {}
