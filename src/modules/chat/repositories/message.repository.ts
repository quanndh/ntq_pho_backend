import { Message } from 'src/modules/chat/entities/message.entity';
import { CommonRepository } from 'src/modules/common/common.repository';
import { EntityRepository } from 'typeorm';

@EntityRepository(Message)
export class MessageRepository extends CommonRepository<Message> {}
