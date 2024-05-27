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
	UploadedFiles,
	UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@shared/decorators/current-user..decorator';
import { AuthGuard } from '@shared/guards/auth.guard';
import { Serialize } from '@shared/interceptors/serialize.interceptor';
import { UpdateUserPassDto } from '../../customers/customer/dtos/update-user-pass.dto';
import { AuthService } from './auth.service';
import {
	GetCoachSignupDtoWithTokens,
	GetCustomerIdDto,
	GetCustomerSignupDtoWithTokens,
	GetFloristSignupDtoWithTokens,
	GetSupplierSignupDtoWithTokens,
	LoggedInDTO,
} from './dtos/get-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import {
	CreateCustomerDto,
	CreateFloweriestDto,
	VerifyUserDto,
	createCoachDto,
	createSupplierDto,
} from './dtos/signup-users.dto';

import { UploadFileMultiple } from '../../../shared/decorators/file.decorator';
import { ENUM_FILE_TYPE } from '../../../shared/media/enums';
import { FileType } from '../../../shared/types';
import { currentUser } from '../../../shared/types/current-user.type';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);
	constructor(
		private configService: ConfigService,
		private authService: AuthService,
	) {}

	@ApiTags('Auth')
	@ApiOperation({ summary: 'Customer Signup' })
	@ApiCreatedResponse({
		type: GetCustomerSignupDtoWithTokens,
		description: 'customer successfully registered.',
	})
	@Post('customer/signup')
	@Serialize(GetCustomerSignupDtoWithTokens)
	@HttpCode(HttpStatus.CREATED)
	async customerSignup(@Body() dto: CreateCustomerDto): Promise<object> {
		return await this.authService.signup(dto);
	}

	@ApiTags('Auth')
	@ApiOperation({ summary: 'Coach Signup' })
	@ApiCreatedResponse({
		type: GetCoachSignupDtoWithTokens,
		description: 'coach successfully registered',
	})
	@UploadFileMultiple(
		[
			{ name: 'cv', maxCount: 1 },
			{ name: 'certificates', maxCount: 4 },
		],
		ENUM_FILE_TYPE.PDF,
	)
	@Post('coach/signup')
	@Serialize(GetCoachSignupDtoWithTokens)
	@HttpCode(HttpStatus.CREATED)
	async coachSignup(
		@Body() dto: createCoachDto,
		@UploadedFiles()
		files: {
			cv: FileType;
			certificates: FileType[];
		},
	): Promise<object> {
		return await this.authService.signup(dto, files);
	}

	@ApiTags('Auth')
	@ApiOperation({ summary: 'Supplier Signup' })
	@ApiCreatedResponse({
		type: GetSupplierSignupDtoWithTokens,
		description: 'supplier successfully registered',
	})
	@UploadFileMultiple(
		[
			{ name: 'taxCard', maxCount: 1 },
			{ name: 'commercialRegister', maxCount: 1 },
		],
		ENUM_FILE_TYPE.PDF,
	)
	@Post('supplier/signup')
	@Serialize(GetSupplierSignupDtoWithTokens)
	@HttpCode(HttpStatus.CREATED)
	async supplierSignup(
		@Body() dto: createSupplierDto,
		@UploadedFiles()
		files: {
			taxCard: FileType;
			commercialRegister: FileType;
		},
	): Promise<object> {
		return await this.authService.signup(dto, files);
	}

	@ApiTags('Auth')
	@ApiOperation({ summary: 'Florist Signup' })
	@ApiCreatedResponse({
		type: GetFloristSignupDtoWithTokens,
		description: 'Florist successfully registered',
	})
	@UploadFileMultiple(
		[
			{ name: 'cv', maxCount: 1 },
			{ name: 'certificates', maxCount: 4 },
		],
		ENUM_FILE_TYPE.PDF,
	)
	@Post('florist/signup')
	@Serialize(GetFloristSignupDtoWithTokens)
	@HttpCode(HttpStatus.CREATED)
	async floristSignup(
		@Body() dto: CreateFloweriestDto,
		@UploadedFiles()
		files: {
			cv: FileType;
			certificates: FileType[];
		},
	): Promise<object> {
		return await this.authService.signup(dto, files);
	}

	@ApiTags('Auth')
	@ApiOperation({ summary: 'Verify Account' })
	@ApiCreatedResponse({ description: 'account successfully verified' })
	@Patch('customer/:id')
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
	@ApiCreatedResponse({ type: GetCustomerIdDto, description: 'user id retrieved successfully' })
	@Get('customer/public/:email')
	@Serialize(GetCustomerIdDto)
	async getCustomer(@Param('email') email: string): Promise<object> {
		return await this.authService.getCustomerId(email);
	}

	@ApiTags('Password')
	@ApiOperation({ summary: 'Reset Password' })
	@ApiCreatedResponse({ description: 'password reset successfully' })
	@Patch('customer/public/:resetToken')
	async resetPassword(
		@Param('resetToken') resetToken: string,
		@Body() { password }: UpdateUserPassDto,
	): Promise<object> {
		return await this.authService.resetPassword(resetToken, password);
	}
}
