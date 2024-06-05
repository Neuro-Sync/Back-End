import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IRepository } from '@shared/interfaces';
import { scrypt as _scrypt } from 'crypto';
import { Model } from 'mongoose';
import { promisify } from 'util';
import { Companion, CompanionDocument } from '../schemas';

const scrypt = promisify(_scrypt);
@Injectable()
export class CompanionRepository implements IRepository<Companion> {
	private logger = new Logger(CompanionRepository.name);
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

	async comparePassword(companion: CompanionDocument, candidatePassword: string): Promise<boolean> {
		const [storedHash, salt] = companion.password.split('.');
		const hash = (await scrypt(candidatePassword, salt, 32)) as Buffer;
		if (storedHash !== hash.toString('hex')) return false;
		return true;
	}
}
