import {
	Body,
	Controller,
	Delete,
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
import { CurrentUser } from '@shared/decorators/current-user..decorator';
import { AuthGuard } from '@shared/guards/auth.guard';
import { Serialize } from '@shared/interceptors/serialize.interceptor';
import { UpdateUserPassDto } from '../../patients/dtos/update-user-pass.dto';
import { AuthService } from './auth.service';
import { GetPatientIdDto, GetPatientSignupDtoWithTokens, LoggedInDTO } from './dtos/get-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { CreatePatientDto, VerifyUserDto } from './dtos/signup-users.dto';

import { currentUser } from '@shared/types/current-user.type';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);
	constructor(
		private configService: ConfigService,
		private authService: AuthService,
	) {}

	@ApiTags('Auth')
	@ApiOperation({ summary: 'Patient Signup' })
	@ApiCreatedResponse({
		type: GetPatientSignupDtoWithTokens,
		description: 'patient successfully registered.',
	})
	@Post('patient/signup')
	@Serialize(GetPatientSignupDtoWithTokens)
	@HttpCode(HttpStatus.CREATED)
	async PatientSignup(@Body() dto: CreatePatientDto): Promise<object> {
		return await this.authService.signup(dto);
	}

	@ApiTags('Auth')
	@ApiOperation({ summary: 'Verify Account' })
	@ApiCreatedResponse({ description: 'account successfully verified' })
	@Patch('Patient/:id')
	@HttpCode(HttpStatus.OK)
	async verifyUser(@Body() dto: VerifyUserDto, @Param('id') id: string): Promise<object> {
		return await this.authService.verifyUser(dto, id);
	}

	@ApiTags('Auth')
	@ApiOperation({ summary: 'User Login' })
	@ApiCreatedResponse({ type: LoggedInDTO, description: 'user logged in successfully' })
	@Post('login')
	@Serialize(LoggedInDTO)
	@HttpCode(HttpStatus.OK)
	async login(@Body() { email, password }: LoginUserDto): Promise<object> {
		return await this.authService.login(email, password);
	}

	@ApiTags('Auth')
	@ApiOperation({ summary: 'User Logout' })
	@ApiCreatedResponse({ description: 'user logged out successfully' })
	@Delete('logout')
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	async logout(@CurrentUser() user: currentUser): Promise<object> {
		return await this.authService.logout(user);
	}

	@ApiTags('Password')
	@ApiOperation({ summary: 'Get User Id' })
	@ApiCreatedResponse({ type: GetPatientIdDto, description: 'user id retrieved successfully' })
	@Get('Patient/public/:email')
	@Serialize(GetPatientIdDto)
	async getPatient(@Param('email') email: string): Promise<object> {
		return await this.authService.getPatientId(email);
	}

	@ApiTags('Password')
	@ApiOperation({ summary: 'Reset Password' })
	@ApiCreatedResponse({ description: 'password reset successfully' })
	@Patch('Patient/public/:resetToken')
	async resetPassword(
		@Param('resetToken') resetToken: string,
		@Body() { password }: UpdateUserPassDto,
	): Promise<object> {
		return await this.authService.resetPassword(resetToken, password);
	}
}
