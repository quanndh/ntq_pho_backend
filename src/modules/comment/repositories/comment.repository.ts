import { CommonRepository } from 'src/modules/common/common.repository';
import { EntityRepository } from 'typeorm';
import { Comments } from '../entities/comment.entity';

@EntityRepository(Comments)
export class CommentRepository extends CommonRepository<Comments> {}
