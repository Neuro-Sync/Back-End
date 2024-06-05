import { CompanionRepository } from '@modules/companions/companion/repositories';
import { Companion } from '@modules/companions/companion/schemas';
import { PatientRepository } from '@modules/patients/patient/repositories';
import { Patient } from '@modules/patients/patient/schema/patient.schema';
import { Injectable } from '@nestjs/common';
import { UserType } from '@shared/enums';
import * as nodemailer from 'nodemailer';
import { mailTypes } from './enums';

@Injectable()
export class MailerService {
	constructor(
		private readonly patientRepository: PatientRepository,
		private readonly companionRepository: CompanionRepository,
	) {}

	mailTransporter(): nodemailer.Transporter {
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
	async sendEmail(
		userId: string,
		Otp: string,
		mailType: mailTypes,
		userType: UserType,
	): Promise<void> {
		let user: Patient | Companion;
		switch (userType) {
			case UserType.PATIENT:
				user = await this.patientRepository.findById(userId);
				break;
			case UserType.COMPANION:
				user = await this.companionRepository.findById(userId);
				break;
			default:
				throw new Error('User type not found');
		}

		const format = this.mailFormats[mailType];

		const textWithOTP = format.text.replace('{{OTP}}', Otp);

		const mailOptions = {
			from: process.env.MAILER_EMAIL,
			to: user.email,
			subject: format.subject,
			text: textWithOTP,
		};

		const transporter = this.mailTransporter();
		transporter.sendMail(mailOptions, function (error: unknown, info: unknown) {
			if (error) {
				throw new Error(`Error sending email ${info}`);
			}
		});
	}
}
