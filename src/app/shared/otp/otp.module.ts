import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './schemas/otp.schema';
import { OtpController } from './otp.controller';
import { MailerModule } from '../mailer/mailer.module';
import { TokenModule } from '../token/token.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
		MailerModule,
		TokenModule,
	],
	providers: [OtpService],
	exports: [OtpService],
	controllers: [OtpController],
})
export class OtpModule {}
