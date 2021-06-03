import { CommonRepository } from "src/modules/common/common.repository";
import { PostOption } from "src/modules/post/entities/post_option.entity";
import { EntityRepository } from "typeorm";

@EntityRepository(PostOption)
export class PostOptionRepostory extends CommonRepository<PostOption> {}
