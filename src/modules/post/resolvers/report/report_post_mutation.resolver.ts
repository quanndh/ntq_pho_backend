import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Report } from '../../entities/report.entity';
import { PostService } from '../../services/post.service';
import { ReportService } from '../../services/report.service';

@Resolver(() => Report)
export class ReportedPostMutationResolver {
  constructor(private readonly postService: PostService, private readonly reportService: ReportService) {}

  @Mutation(() => Boolean)
  async removeReportedPost(@Args('id') id: number): Promise<boolean> {
    return await this.reportService.removeReportedPost(id);
  }
}
