import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/modules/common/common.repository';
import { Report } from 'src/modules/post/entities/report.entity';

@EntityRepository(Report)
export class ReportRepository extends CommonRepository<Report> {}
