import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { MessageRepository } from 'src/modules/chat/repositories/message.repository';
import { Message } from 'src/modules/chat/entities/message.entity';

@Injectable({ scope: Scope.REQUEST })
export class MessageDataloader extends DataLoader<number, Message> {
  constructor(private readonly messageRepository: MessageRepository) {
    super(async (ids: ReadonlyArray<number>) => {
      const rows = await this.messageRepository.findByIds([...ids]);
      return ids.map((id) => rows.find((x) => x.id == id) || new Error('Not found'));
    });
  }
}
