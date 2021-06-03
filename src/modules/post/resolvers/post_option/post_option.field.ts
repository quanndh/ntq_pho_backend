import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PostOption } from "src/modules/post/entities/post_option.entity";
import { UserDataLoader } from "src/modules/users/dataloaders/users.dataloader";
import { User } from "src/modules/users/entities/users.entity";

@Resolver(() => PostOption)
export class PostOptionFieldResolver {
  constructor(private readonly userDataloader: UserDataLoader) {}

  @ResolveField(() => [User])
  async voterInfo(@Parent() postOption: PostOption) {
    return await this.userDataloader.loadMany(postOption.voted);
  }
}
