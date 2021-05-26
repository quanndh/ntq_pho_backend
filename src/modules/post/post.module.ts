import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationModule } from "src/modules/notifications/notification.module";
import { LikeFieldResolver } from "src/modules/post/resolvers/likes/like_field.resolver";
import { LikeQueryResolver } from "src/modules/post/resolvers/likes/like_query.resolver";
import { LikeSubscriptionResolver } from "src/modules/post/resolvers/likes/like_subscription.resolver";
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
import { LikeService } from "./services/like.service";
import { PostService } from "./services/post.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostRepository, Like, LikeRepository]),
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
    PostFieldResolver,
    LikeService,
    LikeQueryResolver,
    LikeSubscriptionResolver,
    LikeFieldResolver,
  ],
  exports: [PostService, PostDataloader, LikeService],
})
export class PostModule {}
