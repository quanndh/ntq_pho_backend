import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationModule } from "src/modules/notifications/notification.module";
import { Report } from "src/modules/post/entities/report.entity";
import { ReportRepository } from "src/modules/post/repositories/report.repository";
import { LikeFieldResolver } from "src/modules/post/resolvers/likes/like_field.resolver";
import { LikeQueryResolver } from "src/modules/post/resolvers/likes/like_query.resolver";
import { LikeSubscriptionResolver } from "src/modules/post/resolvers/likes/like_subscription.resolver";
import { ReportService } from "src/modules/post/services/report.service";
import { CommentModule } from "../comment/comment.module";
import { MediaModule } from "../media/media.module";
import { UsersModule } from "../users/users.module";
import { PostDataloader } from "./dataloaders/post.dataloaders";
import { Like } from "./entities/like.entity";
import { Post } from "./entities/post.entity";
import { LikeRepository } from "./repositories/like.repository";
import { PostRepository } from "./repositories/post.repository";
import { PostFieldResolver } from "./resolvers/post/post_field.resolver";
import { PostMutationResolver } from "./resolvers/post/post_mutation.resolver";
import { PostQueryResolver } from "./resolvers/post/post_query.resolver";
import { ReportPostFieldResolver } from "./resolvers/report/post_filed.resolver";
import { ReportedPostMutationResolver } from "./resolvers/report/report_post_mutation.resolver";
import { ReportPostQueryResolver } from "./resolvers/report/report_post_query.resolver";
import { LikeService } from "./services/like.service";
import { PostService } from "./services/post.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      PostRepository,
      Like,
      LikeRepository,
      Report,
      ReportRepository,
    ]),
    forwardRef(() => CommentModule),
    forwardRef(() => UsersModule),
    forwardRef(() => MediaModule),
    forwardRef(() => NotificationModule),
  ],
  providers: [
    PostMutationResolver,
    PostService,
    PostQueryResolver,
    PostDataloader,
    ReportPostQueryResolver,
    ReportedPostMutationResolver,
    PostFieldResolver,
    ReportPostFieldResolver,
    LikeService,
    ReportService,
    LikeQueryResolver,
    LikeSubscriptionResolver,
    LikeFieldResolver,
  ],
  exports: [PostService, PostDataloader, LikeService, ReportService],
})
export class PostModule {}
