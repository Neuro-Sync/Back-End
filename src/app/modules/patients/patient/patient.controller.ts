import { Controller, Get, Logger } from '@nestjs/common';
import { CurrentUser } from '@shared/decorators';
import { PatientDocument } from './schema/patient.schema';

@Controller('patients')
export class PatientController {
	private logger = new Logger(PatientController.name);
	constructor() {}

	@Get('me')
	async getPatient(@CurrentUser() patient: PatientDocument): Promise<unknown> {
		return {
			message: 'Patient found!',
			data: patient,
		};
	}
}
