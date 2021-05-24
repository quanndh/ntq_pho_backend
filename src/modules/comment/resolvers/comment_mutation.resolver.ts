import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/common.decorator';
import { GqlCookieAuthGuard } from 'src/guards/gql-auth.guard';
import { User } from 'src/modules/users/entities/users.entity';
import { CreateCommentInput, UpdateCommentInput } from '../dtos/comments.input';
import { Comments } from '../entities/comment.entity';
import { CommentService } from '../services/comment.service';

@Resolver(() => Comments)
export class CommentMutationResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(GqlCookieAuthGuard)
  @Mutation(() => Comments)
  async createComment(@CurrentUser() user: User, @Args('input') input: CreateCommentInput): Promise<Comments> {
    return await this.commentService.create(user.id, input);
  }

  @Mutation(() => Comments)
  async updateComment(@Args('input') input: UpdateCommentInput): Promise<Comments> {
    return await this.commentService.update(input);
  }

  @Mutation(() => Boolean)
  async removeComment(@Args('id') id: number, @Args('postId') postId: number): Promise<boolean> {
    return await this.commentService.remove(id, postId);
  }
}
