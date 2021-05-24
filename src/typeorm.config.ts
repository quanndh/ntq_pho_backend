import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AuthTokenEntity } from "./modules/auth/entities/auth.entity";
import { MediaEntity } from "./modules/media/entities/media.entity";
import { User } from "./modules/users/entities/users.entity";
import { Post } from "./modules/post/entities/post.entity";
import { Comments } from "./modules/comment/entities/comment.entity";
import { Like } from "./modules/post/entities/like.entity";
import { Report } from "src/modules/post/entities/report.entity";
import { Notification } from "src/modules/notifications/entities/notification.entity";
import { Chat } from "src/modules/chat/entities/chat.entity";
import { Message } from "src/modules/chat/entities/message.entity";

export const typeORMConfig: TypeOrmModuleOptions = {
  type: "postgres",
  port: parseInt(process.env.DATABASE_PORT || "5432", 10),
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNC === "true",
  logging: process.env.DATABASE_LOGGING === "true",
  entities: [
    User,
    MediaEntity,
    AuthTokenEntity,
    Like,
    Post,
    Comments,
    Report,
    Notification,
    Chat,
    Message,
  ],
};
