import { Body, Controller, HttpCode, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CompanionSignupDto } from './dtos';
import { VerifyUserDto } from './dtos/signup-users.dto';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);
	constructor(
		private configService: ConfigService,
		private authService: AuthService,
	) {}

	// @Post('patients/signup')
	// @Serialize(GetPatientSignupDtoWithTokens)
	// @HttpCode(HttpStatus.CREATED)
	// @ApiTags('Auth')
	// @ApiOperation({ summary: 'Patient Signup' })
	// @ApiCreatedResponse({
	// 	type: GetPatientSignupDtoWithTokens,
	// 	description: 'patient successfully registered.',
	// })
	// async PatientSignup(@Body() dto: CreatePatientDto): Promise<object> {
	// 	// return await this.authService.companionLogin(dto);
	// }

	@Post('companions/signup')
	@HttpCode(HttpStatus.CREATED)
	@ApiTags('Auth')
	@ApiOperation({ summary: 'Companion Signup' })
	@ApiCreatedResponse({
		description: 'Companion successfully registered.',
	})
	async companionSignup(@Body() companionSignupDto: CompanionSignupDto): Promise<unknown> {
		return await this.authService.companionSignup(companionSignupDto);
	}

	@Patch('Patient/:id')
	@HttpCode(HttpStatus.OK)
	@ApiTags('Auth')
	@ApiOperation({ summary: 'Verify Account' })
	@ApiCreatedResponse({ description: 'account successfully verified' })
	async verifyUser(@Body() dto: VerifyUserDto, @Param('id') id: string): Promise<object> {
		return await this.authService.verifyUser(dto, id);
	}

	// @Post('login')
	// @Serialize(LoggedInDTO)
	// @HttpCode(HttpStatus.OK)
	// @ApiTags('Auth')
	// @ApiOperation({ summary: 'User Login' })
	// @ApiCreatedResponse({ type: LoggedInDTO, description: 'user logged in successfully' })
	// async login(@Body() { email, password }: LoginUserDto): Promise<object> {
	// 	return await this.authService.login(email, password);
	// }

	// @Delete('logout')
	// @UseGuards(AuthGuard)
	// @HttpCode(HttpStatus.OK)
	// @ApiTags('Auth')
	// @ApiOperation({ summary: 'User Logout' })
	// @ApiCreatedResponse({ description: 'user logged out successfully' })
	// async logout(@CurrentUser() user: currentUser): Promise<object> {
	// 	return await this.authService.logout(user);
	// }

	// @Get('Patient/public/:email')
	// @ApiTags('Password')
	// @ApiOperation({ summary: 'Get User Id' })
	// @ApiCreatedResponse({ type: GetPatientIdDto, description: 'user id retrieved successfully' })
	// @Serialize(GetPatientIdDto)
	// async getPatient(@Param('email') email: string): Promise<object> {
	// 	return await this.authService.getPatientId(email);
	// }

	// @Patch('patients/public/:resetToken')
	// @ApiTags('Password')
	// @ApiOperation({ summary: 'Reset Password' })
	// @ApiCreatedResponse({ description: 'password reset successfully' })
	// async resetPassword(
	// 	@Param('resetToken') resetToken: string,
	// 	@Body() { password }: UpdateUserPassDto,
	// ): Promise<object> {
	// 	return await this.authService.resetPassword(resetToken, password);
	// }
}
