import { CompanionDocument } from '@modules/companions/companion/schemas';
import { PatientDocument } from '@modules/patients/patient/schema/patient.schema';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Logger,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@shared/decorators';
import { AuthGuard } from '@shared/guards/auth.guard';
import { PatientGuard } from '@shared/guards/patient.guard';
import { AuthService } from './auth.service';
import { CompanionSignupDto, LoginUserDto, PatientOnboardingDto } from './dtos';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);
	constructor(
		private config: ConfigService,
		private authService: AuthService,
	) {}

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

	@Post('companions/login')
	@HttpCode(HttpStatus.CREATED)
	@ApiTags('Auth')
	@ApiOperation({ summary: 'Companion Login' })
	@ApiCreatedResponse({
		description: 'Companion successfully LoggedIn.',
	})
	async companionLogin(@Body() companionLoginDto: LoginUserDto): Promise<unknown> {
		return await this.authService.companionLogin(companionLoginDto);
	}

	@UseGuards(AuthGuard)
	@Get('patient-link/:hash')
	@HttpCode(HttpStatus.CREATED)
	@ApiTags('Auth')
	@ApiOperation({ summary: 'Companion Linkage' })
	@ApiCreatedResponse({
		description: 'Companion successfully Linked.',
	})
	async companionLinkage(
		@Param('hash') hash: string,
		@CurrentUser() companion: CompanionDocument,
	): Promise<unknown> {
		return await this.authService.companionLinkage(companion, hash);
	}

	//!: The link returned will be converted to a QR code in the client side (Mobile App)
	@UseGuards(AuthGuard)
	@UseGuards(PatientGuard)
	@Patch('patient-link')
	@HttpCode(HttpStatus.CREATED)
	@ApiTags('Auth')
	@ApiOperation({ summary: 'Patient Linkage' })
	@ApiCreatedResponse({
		description: 'Patient successfully Created A Link.',
	})
	async patientLinkage(@CurrentUser() patient: PatientDocument): Promise<unknown> {
		return await this.authService.patientLinkage(patient);
	}

	@Post('patients/onboarding')
	@HttpCode(HttpStatus.OK)
	@ApiTags('Auth')
	@ApiOperation({ summary: 'User Login' })
	@ApiCreatedResponse({ description: 'patient onboarding done successfully' })
	async patientOnboarding(@Body() patientOnboardingDto: PatientOnboardingDto): Promise<unknown> {
		return await this.authService.patientOnboarding(patientOnboardingDto);
	}

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
