import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IRepository } from '@shared/interfaces';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas';

@Injectable()
export class MessageRepository implements IRepository<Message> {
	constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}
	async create(data: Message): Promise<MessageDocument> {
		return await this.messageModel.create(data);
	}

	async update(id: string, data: Partial<Message>): Promise<MessageDocument> {
		return await this.messageModel.findByIdAndUpdate(id, data, { new: true });
	}

	async delete(id: string): Promise<void> {
		await this.messageModel.findByIdAndDelete(id);
	}

	async findById(id: string): Promise<MessageDocument> {
		return await this.messageModel.findById(id);
	}

	async findAll(): Promise<MessageDocument[]> {
		return await this.messageModel.find();
	}

	async findOne(query: unknown): Promise<MessageDocument> {
		return await this.messageModel.findOne(query || {});
	}
}
