import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { EventPayload } from '@shared/types';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  private logger = new Logger(ChatGateway.name);
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() payload: EventPayload): void {
    this.server.emit('receive_message', payload);
    this.logger.debug(`Message received: ${JSON.stringify(payload)}`);
    this.logger.debug(
      `Message received: ${JSON.stringify(Buffer.from(payload.data as string, 'binary'))}`
    );
  }
}
