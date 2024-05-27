import { OtpTypes } from '../otp/enums';
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { sendEmailDto } from './interfaces/mail.interface';
import { CustomerService } from '../customer/customer.service';
import { text } from 'stream/consumers';
import { Subject } from 'rxjs';
import { mailTypes } from './enums';

@Injectable()
export class MailerService {
	constructor(private readonly customerService: CustomerService) {}

	mailTransporter() {
		const Transporter = nodemailer.createTransport({
			service: 'gmail',
			host: 'smtp.gmail.com',
			auth: {
				user: process.env.MAILER_EMAIL,
				pass: process.env.MAILER_PASSWORD,
			},
		});
		return Transporter;
	}

	// async sendEmail(dto: sendEmailDto) {
	// 	dto.from = process.env.MAILER_EMAIL;
	// 	const transporter = this.mailTransporter();
	// 	transporter.sendMail(dto, function (error, info) {
	// 		if (error) {
	// 			console.log(error);
	// 			throw new Error('Error sending email');
	// 		}
	// 	});
	// }

	mailFormats = {
		Verify_Account: {
			subject: 'Verify your account',
			text: 'Your OTP is {{OTP}}',
		},
		Reset_Password: {
			subject: 'Reset your password',
			text: 'Your OTP is {{OTP}}',
		},
	};

	// FIXME replace OTP with interface that represent data and based on it check what we need to replace
	async sendEmail(customerId: string, Otp: string, mailType: mailTypes) {
		const [customer] = await this.customerService.findCustomers({ id: customerId });
		const format = this.mailFormats[mailType];

		const textWithOTP = format.text.replace('{{OTP}}', Otp);

		const mailOptions = {
			from: process.env.MAILER_EMAIL,
			to: customer.email,
			subject: format.subject,
			text: textWithOTP,
		};

		const transporter = this.mailTransporter();
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				throw new Error('Error sending email');
			}
		});
	}
}
