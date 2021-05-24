import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from '../../entities/post.entity';
import { Report } from '../../entities/report.entity';
import { PostService } from '../../services/post.service';

@Resolver(() => Report)
export class ReportPostFieldResolver {
  constructor(private readonly postService: PostService) {}

  @ResolveField(() => Post, { nullable: true })
  async postInfo(@Parent() post: Report): Promise<Post | undefined> {
    const postInfo = this.postService.findById(post.postId);
    return postInfo;
  }
}
