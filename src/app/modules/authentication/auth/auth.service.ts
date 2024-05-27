import { PatientService } from '@modules/patients/patient/patient.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@shared/mailer/mailer.service';
import { ImageService } from '@shared/media/image.service';
import { OtpTypes } from '@shared/otp/enums';
import { OtpService } from '@shared/otp/otp.service';
import { TokenTypes } from '@shared/token/enums';
import { TokenService } from '@shared/token/token.service';
import { FileType } from '@shared/types';
import { currentUser } from '@shared/types/current-user.type';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { AuthSessionService } from '../auth-session/auth-session.service';
import { AuthSessionStatus } from '../auth-session/enums';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
	constructor(
		private readonly authSessionService: AuthSessionService,
		private readonly PatientService: PatientService,
		private readonly mailerService: MailerService,
		private readonly tokenService: TokenService,
		private readonly imageService: ImageService,
		private readonly otpService: OtpService,
	) {}

	// FIXME: we need to ensure other signup can be used if user in logged in
	// FIXME: we need to wrap all the services int try catch for error handling
	// we need to create Patient first then update it and wrap it all in transactions
	async signup(
		dto,
		files?: {
			profilePicture?: FileType;
		},
	): Promise<object> {
		const { email, phone } = dto;
		const uploadedFiles = {};

		const [PatientWithEmail] = await this.PatientService.findPatients({ email });
		if (PatientWithEmail) throw new BadRequestException('email in use');

		const [PatientWithPhone] = await this.PatientService.findPatients({ phone });
		if (PatientWithPhone) throw new BadRequestException('phone in use');

		for (const file in files) {
			if (file === 'profilePicture') {
				const image = await this.imageService.uploadSingleImage(files[file]);
				uploadedFiles['profilePicture'] = image.id;
			}
		}

		try {
			const user = await this.PatientService.createPatient(dto);
			await this.otpService.createAndSendOtp(user._id.toString(), OtpTypes.Verify_Account);

			const session = await this.authSessionService.createSession({
				user: user._id.toString(),
				expiresAt: new Date(Date.now() + parseInt(process.env.SESSION_EXPIRY_IN_DAY) * 86400000),
				status: AuthSessionStatus.ACTIVE,
			});

			const accessToken = await this.tokenService.signJWT(
				{ ...user.toJSON(), session: session.id },
				'access',
			);

			const refreshToken = await this.tokenService.signJWT(
				{ ...user.toJSON(), session: session.id },
				'refresh',
			);

			return { user, accessToken, refreshToken };
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async login(email: string, password: string): Promise<object> {
		const [user] = await this.PatientService.findPatients({ email });
		if (!user) throw new NotFoundException('user not found');

		const [storedHash, salt] = user.password.split('.');
		const hash = (await scrypt(password, salt, 32)) as Buffer;

		if (storedHash !== hash.toString('hex')) throw new BadRequestException('invalid credentials');

		const session = await this.authSessionService.createSession({
			user: user._id.toString(),
			expiresAt: new Date(Date.now() + parseInt(process.env.SESSION_EXPIRY_IN_DAY) * 86400000),
			status: AuthSessionStatus.ACTIVE,
		});

		const accessToken = await this.tokenService.signJWT(
			{ ...user.toJSON(), session: session.id },
			'access',
		);

		const refreshToken = await this.tokenService.signJWT(
			{ ...user.toJSON(), session: session.id },
			'refresh',
		);

		return { user, accessToken, refreshToken };
	}

	async logout(user: currentUser): Promise<object> {
		await this.authSessionService.deleteSessionById(user.session);
		return { message: 'logout successful', accessToken: '', refreshToken: '' };
	}

	async verifyUser(dto: { otp: string }, id: string): Promise<object> {
		const [Patient] = await this.PatientService.findPatients({ id });
		if (!Patient) throw new NotFoundException('Patient not found');

		const isVerified = await this.otpService.verifyOTP(id, dto.otp, OtpTypes.Verify_Account);
		if (!isVerified) throw new BadRequestException('invalid otp');

		Patient.isVerified = true;
		await Patient.save();
		return { message: 'account verified' };
	}

	async getPatientId(email: string): Promise<object> {
		const [Patient] = await this.PatientService.findPatients({ email });
		if (!Patient) throw new NotFoundException('Patient not found');

		return { id: Patient._id };
	}

	async resetPassword(resetToken: string, password: string): Promise<object> {
		const userId = await this.tokenService.verifyToken(resetToken, TokenTypes.RESET_PASSWORD);
		if (!userId) throw new BadRequestException('invalid token');

		await this.PatientService.updatePatientPassword(userId, password);
		return { message: 'password reset successful' };
	}
}
