import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/guards/gql-auth.guard";
import { Like } from "src/modules/post/entities/like.entity";
import { LikeService } from "src/modules/post/services/like.service";
import { UserDataLoader } from "src/modules/users/dataloaders/users.dataloader";
import { User } from "src/modules/users/entities/users.entity";

@Resolver(() => Like)
export class LikeQueryResolver {
  constructor(
    private readonly likeService: LikeService,
    private readonly userDataLoader: UserDataLoader
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  async getUserLikePost(@Args("postId") postId: number) {
    const userIds = await this.likeService.getUserIdLikePost(postId);
    return await this.userDataLoader.loadMany(userIds);
  }
}
