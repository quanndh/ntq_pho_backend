import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/common.decorator';
import { GqlCookieAuthGuard } from 'src/guards/gql-auth.guard';
import { LikeService } from 'src/modules/post/services/like.service';
import { ReportService } from 'src/modules/post/services/report.service';
import { User } from 'src/modules/users/entities/users.entity';
import { CreatePostInput, UpdatePostInput } from '../../dtos/create_post.input';
import { Post } from '../../entities/post.entity';
import { PostService } from '../../services/post.service';

@Resolver(() => Post)
export class PostMutationResolver {
  constructor(
    private readonly postService: PostService,
    private readonly likeService: LikeService,
    private readonly reportService: ReportService,
  ) {}

  // @Mutation(() => Number)
  // returnNumber(): number {
  //   return this.postService.returNumber();
  // }

  @UseGuards(GqlCookieAuthGuard)
  @Mutation(() => Post)
  async createPost(@CurrentUser() user: User, @Args('input') input: CreatePostInput): Promise<Post> {
    return await this.postService.create(user.id, input);
  }

  @Mutation(() => Post)
  async updatePost(@Args('input') input: UpdatePostInput): Promise<Post> {
    return await this.postService.update(input);
  }

  @Mutation(() => Boolean)
  async removePost(@Args('id') id: number): Promise<boolean> {
    return await this.postService.remove(id);
  }

  @UseGuards(GqlCookieAuthGuard)
  @Mutation(() => Boolean)
  async reactToPost(@CurrentUser() user: User, @Args('postId') postId: number) {
    return await this.likeService.reactToPost(user.id, postId);
  }

  @UseGuards(GqlCookieAuthGuard)
  @Mutation(() => Boolean)
  async reportPost(@CurrentUser() user: User, @Args('postId') postId: number) {
    return await this.reportService.reportPost(user.id, postId);
  }
}
