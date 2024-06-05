import { ApiProperty } from '@nestjs/swagger';
import { AddressDocument } from '@shared/address/schemas/address.schema';
import { Gender } from '@shared/enums';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePatientDto {
	@ApiProperty({
		type: String,
		example: 'John',
	})
	@IsString()
	fullName: string;

	@ApiProperty({
		type: String,
		example: '01002020993',
	})
	@IsString()
	phone: string;

	@ApiProperty({
		type: String,
		example: 'mo@me.com',
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		type: String,
		example: 'pass1221',
	})
	@IsString()
	password: string;

	@IsString()
	@IsOptional()
	address?: AddressDocument;

	@IsDate()
	@IsOptional()
	dateOfBirth?: Date;

	@ApiProperty({
		type: String,
		example: 'male',
		enum: Gender,
	})
	@IsEnum(Gender)
	@IsOptional()
	gender: Gender;
}

export class VerifyUserDto {
	@ApiProperty({
		type: String,
		example: '123456',
	})
	@IsString()
	otp: string;
}
