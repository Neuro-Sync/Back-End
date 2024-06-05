import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IRepository } from '@shared/interfaces';
import { Model } from 'mongoose';
import { Companion, CompanionDocument } from '../schemas';

@Injectable()
export class CompanionRepository implements IRepository<Companion> {
	constructor(@InjectModel(Companion.name) private companionModel: Model<Companion>) {}

	async create(data: Companion): Promise<CompanionDocument> {
		return await this.companionModel.create(data);
	}

	async update(id: string, data: Partial<Companion>): Promise<CompanionDocument> {
		return await this.companionModel.findByIdAndUpdate(id, data, { new: true });
	}

	async delete(id: string): Promise<void> {
		await this.companionModel.findByIdAndDelete(id);
	}

	async findById(id: string): Promise<CompanionDocument> {
		return await this.companionModel.findById(id);
	}

	async findAll(): Promise<CompanionDocument[]> {
		return await this.companionModel.find();
	}

	async findOne(query: unknown): Promise<CompanionDocument> {
		return await this.companionModel.findOne(query);
	}
}
