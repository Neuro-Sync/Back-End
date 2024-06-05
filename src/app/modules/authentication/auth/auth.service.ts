import { CompanionRepository } from '@modules/companions/companion/repositories';
import { Companion, CompanionDocument } from '@modules/companions/companion/schemas';
import { PatientRepository } from '@modules/patients/patient/repositories';
import { PatientDocument } from '@modules/patients/patient/schema/patient.schema';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserType } from '@shared/enums';
import { ImageService } from '@shared/media/image.service';
import { OtpTypes } from '@shared/otp/enums';
import { OtpService } from '@shared/otp/otp.service';
import { TokenService } from '@shared/token/token.service';
import { currentUser } from '@shared/types/current-user.type';
import * as crypto from 'crypto';
import { AuthSessionService } from '../auth-session/auth-session.service';
import { AuthSessionStatus } from '../auth-session/enums';
import { CompanionSignupDto, LoginUserDto, PatientLinkageDto, PatientOnboardingDto } from './dtos';
@Injectable()
export class AuthService {
	private logger = new Logger(AuthService.name);
	constructor(
		private readonly config: ConfigService,
		private readonly authSessionService: AuthSessionService,
		private readonly patientRepository: PatientRepository,
		private readonly companionRepository: CompanionRepository,
		// private readonly mailerService: MailerService,
		private readonly tokenService: TokenService,
		private readonly imageService: ImageService,
		private readonly otpService: OtpService,
	) {}

	// FIXME: we need to ensure other signup can be used if user in logged in
	// FIXME: we need to wrap all the services int try catch for error handling
	// we need to create Patient first then update it and wrap it all in transactions
	async companionSignup(dto: CompanionSignupDto): Promise<object> {
		const { email, phone } = dto;

		const companionWithEmailConflict = await this.companionRepository.findOne({ email });
		if (companionWithEmailConflict) throw new BadRequestException('email in use');

		const companionWithPhoneConflict = await this.companionRepository.findOne({ phone });
		if (companionWithPhoneConflict) throw new BadRequestException('phone in use');

		try {
			const companion = new Companion();
			Object.assign(companion, dto);
			const user = await this.companionRepository.create(companion);
			await this.otpService.createAndSendOtp(user.id, OtpTypes.Verify_Account, UserType.COMPANION);

			const session = await this.authSessionService.createSession({
				user: user.id,
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

	// async signup(
	// 	dto,
	// 	files?: {
	// 		profilePicture?: FileType;
	// 	},
	// ): Promise<object> {
	// 	const { email, phone } = dto;
	// 	const uploadedFiles = {};

	// 	const [PatientWithEmail] = await this.PatientService.findPatients({ email });
	// 	if (PatientWithEmail) throw new BadRequestException('email in use');

	// 	const [PatientWithPhone] = await this.PatientService.findPatients({ phone });
	// 	if (PatientWithPhone) throw new BadRequestException('phone in use');

	// 	for (const file in files) {
	// 		if (file === 'profilePicture') {
	// 			const image = await this.imageService.uploadSingleImage(files[file]);
	// 			uploadedFiles['profilePicture'] = image.id;
	// 		}
	// 	}

	// 	try {
	// 		const user = await this.PatientService.createPatient(dto);
	// 		await this.otpService.createAndSendOtp(user._id.toString(), OtpTypes.Verify_Account);

	// 		const session = await this.authSessionService.createSession({
	// 			user: user._id.toString(),
	// 			expiresAt: new Date(Date.now() + parseInt(process.env.SESSION_EXPIRY_IN_DAY) * 86400000),
	// 			status: AuthSessionStatus.ACTIVE,
	// 		});

	// 		const accessToken = await this.tokenService.signJWT(
	// 			{ ...user.toJSON(), session: session.id },
	// 			'access',
	// 		);

	// 		const refreshToken = await this.tokenService.signJWT(
	// 			{ ...user.toJSON(), session: session.id },
	// 			'refresh',
	// 		);

	// 		return { user, accessToken, refreshToken };
	// 	} catch (error) {
	// 		throw new BadRequestException(error.message);
	// 	}
	// }

	async companionLogin(loginDto: LoginUserDto): Promise<{
		companion: CompanionDocument;
		accessToken: string;
		refreshToken: string;
	}> {
		const { email, password } = loginDto;
		const companion = await this.companionRepository.findOne({ email });
		if (!companion) throw new NotFoundException('user not found');

		if (!(await this.companionRepository.comparePassword(companion, password)))
			throw new BadRequestException('invalid credentials');

		const session = await this.authSessionService.createSession({
			user: companion.id,
			expiresAt: new Date(
				Date.now() + parseInt(process.env.SESSION_EXPIRY_IN_DAY) * 24 * 60 * 60 * 1000,
			),
			status: AuthSessionStatus.ACTIVE,
		});

		const accessToken = await this.tokenService.signJWT(
			{ ...companion.toJSON(), session: session.id },
			'access',
		);

		const refreshToken = await this.tokenService.signJWT(
			{ ...companion.toJSON(), session: session.id },
			'refresh',
		);

		return { companion, accessToken, refreshToken };
	}

	async companionLinkage(companion: CompanionDocument, hash: string): Promise<{ message: string }> {
		this.logger.debug(hash);
		const decipher = crypto.createDecipheriv(
			'sha256',
			this.config.get<string>('app.linkageSecret'),
			this.config.get<string>('app.linkageInitVector'),
		);
		const patientId = decipher.update(hash, 'hex', 'utf8');

		const patient = await this.patientRepository.findById(patientId);
		if (!patient) throw new NotFoundException('patient not found');
		patient.companion = companion.id;
		patient.isLinked = true;
		try {
			await patient.save();
			return { message: 'patient linked successfully' };
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async patientLinkage(patient: PatientDocument): Promise<PatientLinkageDto> {
		const cipher = crypto.createCipheriv(
			'sha256',
			this.config.get<string>('app.linkageSecret'),
			this.config.get<string>('app.linkageInitVector'),
		);
		const hash = cipher.update(patient.id, 'utf8', 'hex');
		this.logger.debug(hash);

		const link = `${this.config.get<string>('app.serverUrl')}/auth/patient-link/${hash}`;
		return { link };
	}

	async patientOnboarding(patientOnboardingDto: PatientOnboardingDto): Promise<unknown> {
		await this.patientRepository.create({ ...patientOnboardingDto });
		this.otpService.createAndSendOtp(
			patientOnboardingDto.email,
			OtpTypes.Verify_Account,
			UserType.PATIENT,
		);
		return { message: 'patient onboarding done successfully' };
	}

	// async login(email: string, password: string): Promise<object> {
	// 	const [user] = await this.PatientService.findPatients({ email });
	// 	if (!user) throw new NotFoundException('user not found');

	// 	const [storedHash, salt] = user.password.split('.');
	// 	const hash = (await scrypt(password, salt, 32)) as Buffer;

	// 	if (storedHash !== hash.toString('hex')) throw new BadRequestException('invalid credentials');

	// 	const session = await this.authSessionService.createSession({
	// 		user: user._id.toString(),
	// 		expiresAt: new Date(Date.now() + parseInt(process.env.SESSION_EXPIRY_IN_DAY) * 86400000),
	// 		status: AuthSessionStatus.ACTIVE,
	// 	});

	// 	const accessToken = await this.tokenService.signJWT(
	// 		{ ...user.toJSON(), session: session.id },
	// 		'access',
	// 	);

	// 	const refreshToken = await this.tokenService.signJWT(
	// 		{ ...user.toJSON(), session: session.id },
	// 		'refresh',
	// 	);

	// 	return { user, accessToken, refreshToken };
	// }

	async logout(user: currentUser): Promise<void> {
		await this.authSessionService.deleteSessionById(user.session);
	}

	async verifyUser(dto: { otp: string }, id: string): Promise<CompanionDocument> {
		const companion = await this.companionRepository.findById(id);
		if (!companion) throw new NotFoundException('companion not found');

		const isVerified = await this.otpService.verifyOTP(
			companion.email,
			dto.otp,
			OtpTypes.Verify_Account,
			UserType.COMPANION,
		);
		if (!isVerified) throw new BadRequestException('invalid otp');

		companion.isVerified = true;
		return await companion.save();
	}

	// async getPatientId(email: string): Promise<object> {
	// 	const [Patient] = await this.PatientService.findPatients({ email });
	// 	if (!Patient) throw new NotFoundException('Patient not found');

	// 	return { id: Patient._id };
	// }

	// async resetPassword(resetToken: string, password: string): Promise<object> {
	// 	const userId = await this.tokenService.verifyToken(resetToken, TokenTypes.RESET_PASSWORD);
	// 	if (!userId) throw new BadRequestException('invalid token');

	// 	await this.PatientService.updatePatientPassword(userId, password);
	// 	return { message: 'password reset successful' };
	// }
}
