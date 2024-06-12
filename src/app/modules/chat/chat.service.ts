import { Injectable } from '@nestjs/common';
import { MessageRepository } from './repositories';

@Injectable()
export class ChatService {
  constructor(private readonly messageRepository: MessageRepository) {}
}
