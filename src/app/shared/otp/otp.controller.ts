import { BadRequestException, Body, Controller, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserType } from '@shared/enums';
import { Serialize } from '@shared/interceptors/serialize.interceptor';
import { GetTokenDto } from '../token/dtos/get-token.dto';
import { TokenTypes } from '../token/enums';
import { TokenService } from '../token/token.service';
import { verifyOTPDto } from './dtos/otp.dto';
import { OtpTypes } from './enums';
import { OtpService } from './otp.service';

@ApiTags('Password')
@Controller('otp')
export class OtpController {
	constructor(
		private readonly otpService: OtpService,
		private readonly tokenService: TokenService,
	) {}

	@ApiOperation({ summary: 'Send OTP' })
	@ApiCreatedResponse({ description: 'OTP created successfully' })
	@Post()
	async createAndSendOtp(@Body() body: { userId: string }): Promise<object> {
		await this.otpService.createAndSendOtp(
			body.userId,
			OtpTypes.Verify_Account,
			UserType.COMPANION,
		);
		return { message: 'OTP created successfully' };
	}

	@ApiOperation({ summary: 'Verify OTP' })
	@ApiCreatedResponse({ type: GetTokenDto, description: 'OTP verified successfully' })
	@Post('verify/:otp')
	@Serialize(GetTokenDto)
	async verifyOtp(
		@Body() { userId, OtpType }: verifyOTPDto,
		@Param('otp') otp: string,
	): Promise<object> {
		const isValid = await this.otpService.verifyOTP(userId, otp, OtpType);
		if (!isValid) throw new BadRequestException('invalid otp');

		const { token } = await this.tokenService.createToken(userId, TokenTypes.RESET_PASSWORD);
		return { token };
	}
}
