import { forwardRef, Module } from "@nestjs/common";
import { ChatCronService } from "./services/chat.cron";
import { ScheduleModule } from '@nestjs/schedule';
import { ChatModule } from "../chat/chat.module";
import { PostCronService } from "./services/post.cron";
import { PostModule } from "../post/post.module";

@Module({
    imports: [ScheduleModule.forRoot(), forwardRef(() => ChatModule), forwardRef(() => PostModule)],
    providers: [ChatCronService, PostCronService],
    exports: [ChatCronService, PostCronService]
})
export class CronModule { }