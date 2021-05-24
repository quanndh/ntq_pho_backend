import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Comments } from 'src/modules/comment/entities/comment.entity';
import { UserDataLoader } from 'src/modules/users/dataloaders/users.dataloader';
import { User } from 'src/modules/users/entities/users.entity';

@Resolver(() => Comments)
export class CommentFieldResolver {
  constructor(private readonly userDataloader: UserDataLoader) {}

  @ResolveField(() => User)
  async creatorInfo(@Parent() comment: Comments) {
    return await this.userDataloader.load(comment.creatorId);
  }
}
