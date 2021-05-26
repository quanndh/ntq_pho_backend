import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/common.decorator";
import { GqlAuthGuard } from "src/guards/gql-auth.guard";
import { LikeService } from "src/modules/post/services/like.service";
import { User } from "src/modules/users/entities/users.entity";
import { CreatePostInput, UpdatePostInput } from "../../dtos/create_post.input";
import { Post } from "../../entities/post.entity";
import { PostService } from "../../services/post.service";

@Resolver(() => Post)
export class PostMutationResolver {
  constructor(
    private readonly postService: PostService,
    private readonly likeService: LikeService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @CurrentUser() user: User,
    @Args("input") input: CreatePostInput
  ): Promise<Post> {
    return await this.postService.create(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async updatePost(@Args("input") input: UpdatePostInput): Promise<Post> {
    return await this.postService.update(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async removePost(@Args("id") id: number): Promise<boolean> {
    return await this.postService.remove(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async reactToPost(@CurrentUser() user: User, @Args("postId") postId: number) {
    return await this.likeService.reactToPost(user.id, postId);
  }
}
