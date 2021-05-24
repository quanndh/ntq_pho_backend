import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentFieldResolver } from 'src/modules/comment/resolvers/comment_field.resolver';
import { CommentSubcriptionResolver } from 'src/modules/comment/resolvers/comment_subcription.resolver';
import { NotificationModule } from 'src/modules/notifications/notification.module';
import { PostModule } from 'src/modules/post/post.module';
import { UsersModule } from 'src/modules/users/users.module';
import { CommentDataloader } from './dataloaders/comment.dataloaders';
import { Comments } from './entities/comment.entity';
import { CommentRepository } from './repositories/comment.repository';
import { CommentMutationResolver } from './resolvers/comment_mutation.resolver';
import { CommentQueryResolver } from './resolvers/comment_query.resolver';
import { CommentService } from './services/comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments, CommentRepository]),
    forwardRef(() => UsersModule),
    forwardRef(() => NotificationModule),
    forwardRef(() => PostModule),
  ],
  providers: [
    CommentMutationResolver,
    CommentDataloader,
    CommentQueryResolver,
    CommentService,
    CommentFieldResolver,
    CommentSubcriptionResolver,
  ],
  exports: [CommentService, CommentDataloader],
})
export class CommentModule {}
