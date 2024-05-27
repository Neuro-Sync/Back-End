import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { OtpTypes } from '../enums';

export class createOTPDto {
	@ApiProperty({
		type: String,
		example: '6635f3eaedc264ea5c062afe',
	})
	@IsString()
	userId: string;

	@ApiProperty({
		type: OtpTypes,
		example: 'RESET_PASSWORD',
		enum: OtpTypes,
	})
	@IsString()
	OtpType: OtpTypes;
}

export class verifyOTPDto {
	@ApiProperty({
		type: String,
		example: '6635f3eaedc264ea5c062afe',
	})
	@IsString()
	userId: string;

	@ApiProperty({
		type: OtpTypes,
		example: 'Verify_Account',
		enum: OtpTypes,
	})
	@IsString()
	OtpType: OtpTypes;
}
