import { CompanionModule } from '@modules/companions/companion/companion.module';
import { Module } from '@nestjs/common';
import { MailerModule } from '@shared/mailer/mailer.module';
import { MediaModule } from '@shared/media/media.module';
import { OtpModule } from '@shared/otp/otp.module';
import { TokenModule } from '@shared/token/token.module';
import { PatientModule } from '../../patients/patient/patient.module';
import { AuthSessionModule } from '../auth-session/auth-session.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [
		PatientModule,
		CompanionModule,
		TokenModule,
		AuthSessionModule,
		OtpModule,
		MailerModule,
		MediaModule,
	],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
