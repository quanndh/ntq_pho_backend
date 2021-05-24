import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { Comments } from '../entities/comment.entity';
import { CommentRepository } from '../repositories/comment.repository';

@Injectable({ scope: Scope.REQUEST })
export class CommentDataloader extends DataLoader<number, Comments> {
  constructor(private readonly commentRepository: CommentRepository) {
    super(async (ids: ReadonlyArray<number>) => {
      const rows = await this.commentRepository.findByIds([...ids]);
      return ids.map((id) => rows.find((x) => x.id == id) || new Error('Not found'));
    });
  }
}
