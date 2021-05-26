import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/common.decorator";
import { GqlAuthGuard } from "src/guards/gql-auth.guard";
import {
  CreateGroupDto,
  UpdateGroupDto,
} from "src/modules/group/dtos/group.dtos";
import { Group } from "src/modules/group/entities/group.entity";
import { GroupService } from "src/modules/group/services/group.service";
import { User } from "src/modules/users/entities/users.entity";

@Resolver(() => Group)
export class GroupMutationResolver {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Group)
  async createGroup(
    @Args({ name: "input", type: () => CreateGroupDto }) input: CreateGroupDto,
    @CurrentUser() user: User
  ) {
    return await this.groupService.createGroup(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Group)
  async updateGroup(
    @Args({ name: "input", type: () => UpdateGroupDto }) input: UpdateGroupDto,
    @CurrentUser() user: User
  ) {
    return await this.groupService.updateGroup(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Number, { description: "Return id nhóm vừa xoá" })
  async deleteGroup(@Args("id") id: number, @CurrentUser() user: User) {
    return await this.groupService.deleteGroup(user.id, id);
  }
}
