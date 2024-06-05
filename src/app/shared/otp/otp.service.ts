import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserType } from '@shared/enums';
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

	private async createOtp(userId: string, OtpType: OtpTypes): Promise<string> {
		const storedOtp = await this.OtpModel.findOne({
			owner: userId,
		});
		if (storedOtp) await this.OtpModel.findByIdAndDelete(storedOtp.id);

		const Otp = Math.floor(100000 + Math.random() * 900000);
		const salt = await bcrypt.genSalt(10);
		const hashedOTP = await bcrypt.hash(Otp.toString(), salt);

		const OTPDocument = new this.OtpModel({ owner: userId, otp: hashedOTP, OtpType });
		await OTPDocument.save();

		return Otp.toString();
	}

	async verifyOTP(userId: string, OTP: string, OtpType: OtpTypes): Promise<boolean> {
		const storedOtp = await this.OtpModel.findOne({
			owner: userId,
			OtpType: OtpType,
			expiresAt: { $gt: new Date(Date.now()) },
		});
		if (!storedOtp) return false;

		const isValid = await bcrypt.compare(OTP, storedOtp.otp);
		if (!isValid) return false;

		await this.OtpModel.findByIdAndDelete(storedOtp.id);

		return true;
	}

	async createAndSendOtp(userId: string, OtpType: OtpTypes, userType: UserType): Promise<void> {
		const Otp = await this.createOtp(userId, OtpType);
		const mailType =
			OtpType === OtpTypes.Verify_Account ? mailTypes.Verify_Account : mailTypes.Reset_Password;
		await this.mailerServer.sendEmail(userId, Otp, mailType, userType);
	}
}
