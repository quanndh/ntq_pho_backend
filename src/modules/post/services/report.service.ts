import { Injectable } from '@nestjs/common';
import { createPaginationObject } from 'src/modules/common/common.repository';
import { ReportRepository } from 'src/modules/post/repositories/report.repository';
import { ReportPostConnection } from '../entities/report.entity';
import { PostService } from './post.service';

@Injectable()
export class ReportService {
  constructor(private readonly reportRepo: ReportRepository, private readonly postService: PostService) {}

  reportPost = async (userId: number, postId: number) => {
    try {
      const newReport = this.reportRepo.create({ userId, postId });
      await this.reportRepo.save(newReport);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getPostReported = async (limit: number, page: number): Promise<ReportPostConnection> => {
    const [items, total] = await this.reportRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return createPaginationObject(items, total, page, limit);
  };

  removeReportedPost = async (reportedPostId: number): Promise<boolean> => {
    const reportedPost = await this.reportRepo.findOne({ id: reportedPostId });
    if (reportedPost) {
      await this.reportRepo.delete({ id: reportedPost.id });
      await this.postService.remove(reportedPost.postId);
      return true;
    }
    return false;
  };
}
