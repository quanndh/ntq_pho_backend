import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/common.decorator";
import { GqlAuthGuard } from "src/guards/gql-auth.guard";
import {
  Group,
  GroupConnection,
} from "src/modules/group/entities/group.entity";
import { GroupService } from "src/modules/group/services/group.service";
import { User } from "src/modules/users/entities/users.entity";

@Resolver(() => Group)
export class GroupQueryResolver {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => GroupConnection)
  async myGroup(
    @CurrentUser() user: User,
    @Args("limit", { defaultValue: 10 }) limit: number,
    @Args("page", { defaultValue: 1 }) page: number
  ) {
    return await this.groupService.myGroup(user.id, limit, page);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => GroupConnection)
  async searchGroup(
    @Args("search", { defaultValue: "" }) search: string,
    @Args("limit", { defaultValue: 10 }) limit: number,
    @Args("page", { defaultValue: 1 }) page: number
  ) {
    return await this.groupService.searchGroup(search, limit, page);
  }
}
