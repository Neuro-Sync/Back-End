import { PatientModule } from '@modules/patients/patient/patient.module';
import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';

//NOTE: This module is must be in shared module
@Module({
	imports: [PatientModule],
	controllers: [],
	providers: [MailerService],
	exports: [MailerService],
})
export class MailerModule {}
