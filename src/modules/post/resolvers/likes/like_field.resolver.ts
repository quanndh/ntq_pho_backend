import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostDataloader } from 'src/modules/post/dataloaders/post.dataloaders';
import { Like } from 'src/modules/post/entities/like.entity';
import { Post } from 'src/modules/post/entities/post.entity';
import { UserDataLoader } from 'src/modules/users/dataloaders/users.dataloader';
import { User } from 'src/modules/users/entities/users.entity';

@Resolver(() => Like)
export class LikeFieldResolver {
  constructor(private readonly userDataloader: UserDataLoader, private readonly postDataloader: PostDataloader) {}

  @ResolveField(() => User)
  async creatorInfo(@Parent() like: Like) {
    return await this.userDataloader.load(like.userId);
  }

  @ResolveField(() => Post)
  async postInfo(@Parent() like: Like) {
    return await this.postDataloader.load(like.postId);
  }
}
