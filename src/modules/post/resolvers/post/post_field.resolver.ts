import { UseGuards } from "@nestjs/common";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/common.decorator";
import { GqlCookieAuthGuard } from "src/guards/gql-auth.guard";
import { MediaDataLoader } from "src/modules/media/dataloaders/media.dataloader";
import { MediaEntity } from "src/modules/media/entities/media.entity";
import { PostOption } from "src/modules/post/entities/post_option.entity";
import { PostOptionService } from "src/modules/post/services/post_option.service";
import { User } from "src/modules/users/entities/users.entity";
import { UsersService } from "src/modules/users/services/users.service";
import { Post } from "../../entities/post.entity";
import { LikeService } from "../../services/like.service";

@Resolver(() => Post)
export class PostFieldResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly likeService: LikeService,
    private readonly postOptionService: PostOptionService,
    private readonly mediaDataloader: MediaDataLoader
  ) {}

  @ResolveField(() => Number, { defaultValue: 0 })
  async totalLike(@Parent() post: Post): Promise<number> {
    return await this.likeService.countPostLike(post.id);
  }

  @UseGuards(GqlCookieAuthGuard)
  @ResolveField(() => Boolean)
  async isLike(
    @CurrentUser() user: User,
    @Parent() post: Post
  ): Promise<boolean> {
    return await this.likeService.isLike(user.id, post.id);
  }

  @ResolveField(() => User, { nullable: true })
  async creatorInfo(@Parent() post: Post): Promise<User | undefined> {
    const user = this.userService.findById(post.creatorId);
    return user;
  }

  @ResolveField(() => [PostOption])
  async options(@Parent() post: Post) {
    return await this.postOptionService.getOptionOfPost(post.id);
  }

  @ResolveField(() => [MediaEntity])
  async mediasData(@Parent() post: Post) {
    return await this.mediaDataloader.loadMany(post.medias);
  }
}
