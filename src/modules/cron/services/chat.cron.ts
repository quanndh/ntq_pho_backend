import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ChatService } from "src/modules/chat/services/chat.service";

@Injectable()
export class ChatCronService {
    private readonly logger = new Logger(ChatCronService.name);

    constructor(private readonly chatService: ChatService) { }

    @Cron(CronExpression.EVERY_30_MINUTES)
    async clearTempChat() {
        await this.chatService.clearTempChat();
        this.logger.log("TEMPORARY CHAT CLEARED")
    }
}