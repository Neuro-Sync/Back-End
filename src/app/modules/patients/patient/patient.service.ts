import { CreatePatientDto } from '@modules/authentication/auth/dtos';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OptionsObjectDto } from '@shared/options-object/dtos';
import { OptionsObject } from '@shared/options-object/optionsObject';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schema/patient.schema';

@Injectable()
export class PatientService {
	private logger = new Logger(PatientService.name);
	constructor(@InjectModel(Patient.name) private patientModel: Model<Patient>) {}

	async findGenericPatients(optionsObjectDto: OptionsObjectDto): Promise<PatientDocument[]> {
		return await new OptionsObject<Patient>(this.patientModel).getResult(optionsObjectDto);
	}

	async findPatients(query: unknown): Promise<PatientDocument[]> {
		return await this.patientModel.find(query || {});
	}

	async findPatient(query: unknown): Promise<PatientDocument> {
		this.logger.debug(`findPatient query:${JSON.stringify(await this.patientModel.find({}))}`);
		return await this.patientModel.findOne(query || {});
	}

	async createPatient(dto: CreatePatientDto): Promise<PatientDocument> {
		return await this.patientModel.create(dto);
	}

	async addProfilePicture(patientId: string, imageId: string): Promise<PatientDocument> {
		return await this.patientModel.findByIdAndUpdate(
			patientId,
			{ profilePicture: imageId },
			{ new: true },
		);
	}

	async updatePatient(
		patientId: string,
		patient: Partial<PatientDocument>,
	): Promise<PatientDocument> {
		return await this.patientModel.findByIdAndUpdate(patientId, patient, { new: true });
	}

	async deletePatient(patientId: string): Promise<PatientDocument> {
		return await this.patientModel.findByIdAndDelete(patientId);
	}

	async verifyPatient(patientId: string): Promise<PatientDocument> {
		return await this.patientModel.findByIdAndUpdate(
			patientId,
			{ isVerified: true },
			{ new: true },
		);
	}

	async suspendPatient(patientId: string): Promise<PatientDocument> {
		return await this.patientModel.findByIdAndUpdate(
			patientId,
			{ isSuspended: true },
			{ new: true },
		);
	}

	async unsuspendPatient(patientId: string): Promise<PatientDocument> {
		return await this.patientModel.findByIdAndUpdate(
			patientId,
			{ isSuspended: false },
			{ new: true },
		);
	}

	async updatePatientPassword(patientId: string, password: string): Promise<PatientDocument> {
		return await this.patientModel.findByIdAndUpdate(
			patientId,
			{ password, passwordChangedAt: new Date() },
			{ new: true },
		);
	}
}
