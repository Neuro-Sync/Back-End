import { CompanionRepository } from '@modules/companions/companion/repositories';
import { PatientRepository } from '@modules/patients/patient/repositories';
import { BadRequestException, Body, Controller, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserType } from '@shared/enums';
import { Serialize } from '@shared/interceptors/serialize.interceptor';
import { GetTokenDto } from '../token/dtos/get-token.dto';
import { TokenTypes } from '../token/enums';
import { TokenService } from '../token/token.service';
import { verifyOTPDto } from './dtos/otp.dto';
import { OtpService } from './otp.service';

@ApiTags('Password')
@Controller('otp')
export class OtpController {
	constructor(
		private readonly patientRepository: PatientRepository,
		private readonly companionRepository: CompanionRepository,
		private readonly otpService: OtpService,
		private readonly tokenService: TokenService,
	) {}

	// @ApiOperation({ summary: 'Send OTP' })
	// @ApiCreatedResponse({ description: 'OTP created successfully' })
	// @Post('/companion')
	// async createAndSendOtp(@Body() body: { userId: string }): Promise<object> {
	// 	await this.otpService.createAndSendOtp(
	// 		body.userId,
	// 		OtpTypes.Verify_Account,
	// 		UserType.COMPANION,
	// 	);
	// 	return { message: 'OTP created successfully' };
	// }

	@ApiOperation({ summary: 'Verify OTP' })
	@ApiCreatedResponse({ type: GetTokenDto, description: 'OTP verified successfully' })
	@Post('companion/:otp')
	@Serialize(GetTokenDto)
	async verifyCompanionOtp(
		@Body() { email, otpType }: verifyOTPDto,
		@Param('otp') otp: string,
	): Promise<object> {
		const userId = (await this.companionRepository.findOne({ email })).id;
		const isValid = await this.otpService.verifyOTP(userId, otp, otpType, UserType.COMPANION);
		if (!isValid) throw new BadRequestException('invalid otp');

		const { token } = await this.tokenService.createToken(userId, TokenTypes.RESET_PASSWORD);
		return { token };
	}

	@ApiOperation({ summary: 'Verify OTP' })
	@ApiCreatedResponse({ type: GetTokenDto, description: 'OTP verified successfully' })
	@Post('patient/:otp')
	@Serialize(GetTokenDto)
	async verifyOtp(
		@Body() { email, otpType }: verifyOTPDto,
		@Param('otp') otp: string,
	): Promise<object> {
		const userId = (await this.patientRepository.findOne({ email })).id;
		const isValid = await this.otpService.verifyOTP(userId, otp, otpType, UserType.PATIENT);
		if (!isValid) throw new BadRequestException('invalid otp');

		const { token } = await this.tokenService.createToken(userId, TokenTypes.RESET_PASSWORD);
		return { token };
	}
}
