import { promisify } from 'util';
import { scrypt as _scrypt } from 'crypto';
import { FileType } from '../../../shared/types';
import { OtpTypes } from '../../customers/otp/enums';
import { TokenTypes } from '../../customers/token/enums';
import { AuthSessionStatus } from '../auth-session/enums';
import { OtpService } from '../../customers//otp/otp.service';
import { TokenService } from '../../customers/token/token.service';
import { ImageService } from '../../../shared/media/image.service';
import { currentUser } from '../../../shared/types/current-user.type';
import { MailerService } from '../../customers/mailer/mailer.service';
import { AuthSessionService } from '../auth-session/auth-session.service';
import { CustomerService } from '../../customers/customer/customer.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
	constructor(
		private readonly authSessionService: AuthSessionService,
		private readonly customerService: CustomerService,
		private readonly mailerService: MailerService,
		private readonly tokenService: TokenService,
		private readonly imageService: ImageService,
		private readonly otpService: OtpService,
	) {}

	// FIXME: we need to ensure other signup can be used if user in logged in
	// FIXME: we need to wrap all the services int try catch for error handling
	// we need to create customer first then update it and wrap it all in transactions
	async signup(
		dto,
		files?: {
			profilePicture?: FileType;
			cv?: FileType;
			taxCard?: FileType;
			certificates?: FileType[];
			commercialRegister?: FileType;
		},
	): Promise<object> {
		const { email, phone } = dto;
		const uploadedFiles = {};

		const [customerWithEmail] = await this.customerService.findCustomers({ email });
		if (customerWithEmail) throw new BadRequestException('email in use');

		const [customerWithPhone] = await this.customerService.findCustomers({ phone });
		if (customerWithPhone) throw new BadRequestException('phone in use');

		for (const file in files) {
			if (file === 'profilePicture') {
				const image = await this.imageService.uploadSingleImage(files[file]);
				uploadedFiles['profilePicture'] = image.id;
			}

			if (file == 'cv') {
				const pdf = await this.imageService.uploadSinglePdf(files[file][0]);
				uploadedFiles['cv'] = pdf.id;
			}

			if (file == 'taxCard') {
				const pdf = await this.imageService.uploadSinglePdf(files[file][0]);
				uploadedFiles['taxCard'] = pdf.id;
			}

			if (file == 'commercialRegister') {
				const pdf = await this.imageService.uploadSinglePdf(files[file][0]);
				uploadedFiles['commercialRegister'] = pdf.id;
			}

			if (file == 'certificates') {
				const certificates = [];
				for (const certificate of files[file]) {
					const pdf = await this.imageService.uploadSinglePdf(certificate);
					certificates.push(pdf.id);
				}
				uploadedFiles['certificates'] = certificates;
			}
		}

		try {
			const user = await this.customerService.createCustomer(dto, uploadedFiles);
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
		const [user] = await this.customerService.findCustomers({ email });
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
		const [customer] = await this.customerService.findCustomers({ id });
		if (!customer) throw new NotFoundException('customer not found');

		const isVerified = await this.otpService.verifyOTP(id, dto.otp, OtpTypes.Verify_Account);
		if (!isVerified) throw new BadRequestException('invalid otp');

		customer.isVerified = true;
		await customer.save();
		return { message: 'account verified' };
	}

	async getCustomerId(email: string): Promise<object> {
		const [customer] = await this.customerService.findCustomers({ email });
		if (!customer) throw new NotFoundException('customer not found');

		return { id: customer._id };
	}

	async resetPassword(resetToken: string, password: string): Promise<object> {
		const userId = await this.tokenService.verifyToken(resetToken, TokenTypes.RESET_PASSWORD);
		if (!userId) throw new BadRequestException('invalid token');

		await this.customerService.updateCustomerPassword(userId, password);
		return { message: 'password reset successful' };
	}
}
