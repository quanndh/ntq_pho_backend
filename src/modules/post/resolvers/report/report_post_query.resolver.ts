import { Args, Query, Resolver } from '@nestjs/graphql';
import { Report, ReportPostConnection } from '../../entities/report.entity';
import { ReportService } from '../../services/report.service';

@Resolver(() => Report)
export class ReportPostQueryResolver {
  constructor(private readonly reportedPostService: ReportService) {}

  @Query(() => ReportPostConnection)
  async getReportedPost(@Args('limit') limit: number, @Args('page') page: number) {
    return await this.reportedPostService.getPostReported(limit, page);
  }
}
