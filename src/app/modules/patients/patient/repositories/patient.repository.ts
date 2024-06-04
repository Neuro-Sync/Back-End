import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IRepository } from '@shared/interfaces';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from '../schema/patient.schema';

@Injectable()
export class PatientRepository implements IRepository<Patient> {
	constructor(@InjectModel(Patient.name) private readonly patientModel: Model<Patient>) {}
	async create(data: Patient): Promise<PatientDocument> {
		return await this.patientModel.create(data);
	}

	async update(id: string, data: Partial<Patient>): Promise<PatientDocument> {
		return await this.patientModel.findByIdAndUpdate(id, data, { new: true });
	}

	async delete(id: string): Promise<void> {
		await this.patientModel.findByIdAndDelete(id);
	}

	async findById(id: string): Promise<PatientDocument> {
		return await this.patientModel.findById(id);
	}

	async findAll(): Promise<PatientDocument[]> {
		return await this.patientModel.find();
	}

	async findOne(query: unknown): Promise<PatientDocument> {
		return await this.patientModel.findOne(query || {});
	}
}
