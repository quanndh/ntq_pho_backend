import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/modules/common/common.repository';
import { Like } from '../entities/like.entity';

@EntityRepository(Like)
export class LikeRepository extends CommonRepository<Like> {}
