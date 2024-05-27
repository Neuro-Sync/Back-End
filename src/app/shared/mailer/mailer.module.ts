import { Module } from '@nestjs/common';
import { CustomerModule } from '../customer/customer.module';
import { MailerService } from './mailer.service';

//NOTE: This module is must be in shared module
@Module({
	imports: [CustomerModule],
	controllers: [],
	providers: [MailerService],
	exports: [MailerService],
})
export class MailerModule {}
