import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./services/users.service";
import { UserRepository } from "./repositories/users.repository";
import { User } from "./entities/users.entity";
import { UserDataLoader } from "./dataloaders/users.dataloader";
import { UsersMutationResolver } from "./resolvers/users_mutation.resolver";
import { UsersQueryResolver } from "./resolvers/users_query.resolver";
import { MediaModule } from "../media/media.module";
import { UserFieldResolver } from "./resolvers/user_field.resolver";
import { ElasticModule } from "src/modules/elastic/elastic.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    forwardRef(() => MediaModule),
    // forwardRef(() =>
    //   ElasticModule.register({ node: process.env.ELASTIC_NODE })
    // ),
  ],
  providers: [
    UserDataLoader,
    UsersService,
    UsersQueryResolver,
    UsersMutationResolver,
    UserFieldResolver,
  ],
  exports: [UsersService, UserDataLoader],
})
export class UsersModule {}
