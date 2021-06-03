import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/common.decorator";
import { GqlAuthGuard } from "src/guards/gql-auth.guard";
import { PostOption } from "src/modules/post/entities/post_option.entity";
import { PostOptionService } from "src/modules/post/services/post_option.service";
import { User } from "src/modules/users/entities/users.entity";

@Resolver(() => PostOption)
export class PostOptionMutationResolver {
  constructor(private readonly postOptionService: PostOptionService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PostOption)
  async addOptionToPost(
    @Args("postId") postId: number,
    @Args("content") content: string
  ) {
    return await this.postOptionService.createOption(postId, content);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PostOption)
  async voteOption(
    @Args("postId") postId: number,
    @Args("id") id: number,
    @CurrentUser() user: User
  ) {
    return await this.postOptionService.voteOption(postId, id, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteOption(
    @Args("postId") postId: number,
    @Args("id") id: number,
    @CurrentUser() user: User
  ) {
    return await this.postOptionService.deleteOption(postId, id, user.id);
  }
}
