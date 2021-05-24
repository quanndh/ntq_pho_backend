import { Resolver } from "@nestjs/graphql";
import { User } from "../entities/users.entity";

@Resolver(() => User)
export class UserFieldResolver {
  constructor() {}
}
