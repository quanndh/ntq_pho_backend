import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/modules/common/common.repository';
import { Post } from '../entities/post.entity';

@EntityRepository(Post)
export class PostRepository extends CommonRepository<Post> {}
