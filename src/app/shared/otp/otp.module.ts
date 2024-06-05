import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';

import { CompanionModule } from '@modules/companions/companion/companion.module';
import { PatientModule } from '@modules/patients/patient/patient.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '../mailer/mailer.module';
import { TokenModule } from '../token/token.module';
import { OtpController } from './otp.controller';
import { Otp, OtpSchema } from './schemas/otp.schema';

@Module({
	imports: [
		PatientModule,
		CompanionModule,
		MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
		MailerModule,
		TokenModule,
	],
	providers: [OtpService],
	exports: [OtpService],
	controllers: [OtpController],
})
export class OtpModule {}
