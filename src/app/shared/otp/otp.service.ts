import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { mailTypes } from '../mailer/enums';
import { MailerService } from '../mailer/mailer.service';
import { OtpTypes } from './enums';
import { Otp } from './schemas/otp.schema';
@Injectable()
export class OtpService {
	constructor(
		@InjectModel(Otp.name) private OtpModel: Model<Otp>,
		private readonly mailerServer: MailerService,
	) {}

	async createOtp(customerId: string, OtpType: OtpTypes): Promise<string> {
		const storedOtp = await this.OtpModel.findOne({
			customer: customerId,
		});
		if (storedOtp) await this.OtpModel.findByIdAndDelete(storedOtp.id);

		const Otp = Math.floor(100000 + Math.random() * 900000);
		const salt = await bcrypt.genSalt(10);
		const hashedOTP = await bcrypt.hash(Otp.toString(), salt);

		const OTPDocument = new this.OtpModel({ customer: customerId, otp: hashedOTP, OtpType });
		await OTPDocument.save();

		return Otp.toString();
	}

	async verifyOTP(customerId: string, OTP: string, OtpType: OtpTypes): Promise<boolean> {
		const storedOtp = await this.OtpModel.findOne({
			customer: customerId,
			OtpType: OtpType,
			expiresAt: { $gt: new Date(Date.now()) },
		});
		if (!storedOtp) return false;

		const isValid = await bcrypt.compare(OTP, storedOtp.otp);
		if (!isValid) return false;

		await this.OtpModel.findByIdAndDelete(storedOtp.id);

		return true;
	}

	async createAndSendOtp(userId: string, OtpType: OtpTypes): Promise<void> {
		const Otp = await this.createOtp(userId, OtpType);
		const mailType =
			OtpType === OtpTypes.Verify_Account ? mailTypes.Verify_Account : mailTypes.Reset_Password;
		await this.mailerServer.sendEmail(userId, Otp, mailType);
	}
}
