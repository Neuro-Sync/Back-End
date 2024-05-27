import { Module } from '@nestjs/common';
import { MailerModule } from '@shared/mailer/mailer.module';
import { ImageModule } from '@shared/media/media.module';
import { OtpModule } from '@shared/otp/otp.module';
import { TokenModule } from '@shared/token/token.module';
import { PatientModule } from '../../patients/patient/patient.module';
import { AuthSessionModule } from '../auth-session/auth-session.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [PatientModule, TokenModule, AuthSessionModule, OtpModule, MailerModule, ImageModule],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
