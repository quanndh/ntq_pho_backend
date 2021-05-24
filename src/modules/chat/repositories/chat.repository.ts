import { Chat } from 'src/modules/chat/entities/chat.entity';
import { CommonRepository } from 'src/modules/common/common.repository';
import { EntityRepository } from 'typeorm';

@EntityRepository(Chat)
export class ChatRepository extends CommonRepository<Chat> {}
