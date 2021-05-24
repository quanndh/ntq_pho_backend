import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/common.decorator';
import { GqlCookieAuthGuard } from 'src/guards/gql-auth.guard';
import { User } from 'src/modules/users/entities/users.entity';
import { CommentDataloader } from '../dataloaders/comment.dataloaders';
import { CommentConnection, Comments } from '../entities/comment.entity';
import { CommentService } from '../services/comment.service';

@Resolver(() => Comments)
export class CommentQueryResolver {
  constructor(private readonly commentService: CommentService, private readonly commentDataloader: CommentDataloader) {}

  @UseGuards(GqlCookieAuthGuard)
  @Query(() => CommentConnection, { defaultValue: [] })
  async getPostComment(
    @Args('postId') postId: number,
    @Args('limit') limit: number,
    @Args('page') page: number,
    @CurrentUser() user: User,
  ) {
    return await this.commentService.findPostComments(postId, limit, page, user);
  }
}
