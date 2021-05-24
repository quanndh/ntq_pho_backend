import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Constants } from "src/modules/constant";
import { PostService } from "src/modules/post/services/post.service";

@Injectable()
export class PostCronService {
    constructor(private readonly postService: PostService) { };

    @Cron(CronExpression.EVERY_10_MINUTES)
    async updateScore() {
        await this.postService.updateScore({ value: -(Constants.TIME_SCORE * 10) });
    }
}