import { Module } from '@nestjs/common';
import { ImageModule } from '../../../shared/media/media.module';
import { CustomerModule } from '../../customers/customer/customer.module';
import { MailerModule } from '../../customers/mailer/mailer.module';
import { OtpModule } from '../../customers/otp/otp.module';
import { TokenModule } from '../../customers/token/token.module';
import { AuthSessionModule } from '../auth-session/auth-session.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [CustomerModule, TokenModule, AuthSessionModule, OtpModule, MailerModule, ImageModule],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
