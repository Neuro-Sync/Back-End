import { Logger } from '@nestjs/common';

export class PatientController {
	private logger = new Logger(PatientController.name);
	constructor() {}
	async findPatients(query) {
		return [];
	}
	async createPatient() {
		return {};
	}
	async updatePatient() {
		return {};
	}
	async deletePatient() {
		return {};
	}
	async verifyPatient() {
		return {};
	}
	async suspendPatient() {
		return {};
	}
	async unsuspendPatient() {
		return {};
	}
}
