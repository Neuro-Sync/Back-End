import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MessageRepository } from './repositories/message.repository';
import { Message, MessageSchema } from './schemas';

@Module({
	imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
	controllers: [ChatController],
	providers: [ChatService, MessageRepository],
})
export class ChatModule {}
