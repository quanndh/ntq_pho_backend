import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/common.decorator";
import { GqlCookieAuthGuard } from "src/guards/gql-auth.guard";
import { User } from "src/modules/users/entities/users.entity";
import { PostDataloader } from "../../dataloaders/post.dataloaders";
import { PostArgs, PostCursorFindOptions } from "../../dtos/post.args";
import {
  Post,
  PostConnection,
  PostCursorConnection,
} from "../../entities/post.entity";
import { PostService } from "../../services/post.service";

@Resolver(() => Post)
export class PostQueryResolver {
  constructor(
    private readonly postService: PostService,
    private readonly postDataLoader: PostDataloader
  ) {}

  @Query(() => PostCursorConnection)
  async test(@Args({ type: () => PostCursorFindOptions }) input) {
    return await this.postService.test(input);
  }

  @UseGuards(GqlCookieAuthGuard)
  @Query(() => Post)
  async getPostDetail(@Args("id") id: number): Promise<Post> {
    return await this.postDataLoader.load(id);
  }

  @UseGuards(GqlCookieAuthGuard)
  @Query(() => PostConnection)
  async myPost(
    @CurrentUser() user: User,
    @Args("limit") limit: number,
    @Args("page") page: number
  ): Promise<PostConnection> {
    return await this.postService.getPostByUserId(user.id, limit, page);
  }

  @UseGuards(GqlCookieAuthGuard)
  @Query(() => PostConnection)
  async getUserPost(
    @Args("userId") userId: number,
    @Args("limit") limit: number,
    @Args("page") page: number
  ) {
    return await this.postService.getPostByUserId(userId, limit, page);
  }
}
