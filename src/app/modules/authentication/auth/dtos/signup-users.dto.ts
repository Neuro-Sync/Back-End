import { IsDate, IsEnum, IsEmail, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '../../../../shared/types';
import { Gender } from '../../../customers/customer/enums';
import { AddressDocument } from '../../../../shared/address/schemas/address.schema';
import { CreateCoachViewDto } from '../../../customers/customer/dtos/create-coach-view.dto';
import { CreateSupplierViewDto } from '../../../customers/customer/dtos/create-supplier-view.dto';
import { CreateFloristViewDto } from '../../../floweriests/floweriest/dtos/create-florist-view.dto';

export class CreateCustomerDto {
	@ApiProperty({
		type: String,
		example: 'John',
	})
	@IsString()
	fullName: string;

	// @ApiProperty({
	// 	type: String,
	// 	example: 'Doe',
	// })
	// @IsString()
	// lastName: string;

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

export class CreateFloweriestDto {
	@ApiProperty({
		type: String,
		example: 'maes',
	})
	@IsString()
	fullName: string;

	@ApiProperty({
		type: String,
		example: '01003030993',
	})
	@IsString()
	phone: string;

	@ApiProperty({
		type: String,
		example: 'tro@me.com',
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
		enum: ['female', 'other', 'male'],
	})
	@IsEnum(Gender)
	@IsOptional()
	gender: Gender;

	@ApiProperty({ type: CreateFloristViewDto })
	@ValidateNested({ each: true })
	@Type(() => CreateFloristViewDto)
	floristView: CreateFloristViewDto;

	@ApiProperty({
		format: 'binary',
		description: 'CV file',
	})
	cv: FileType;

	@ApiProperty({
		type: 'array',
		items: {
			format: 'binary',
		},
		description: 'Certificate files',
	})
	certificates: FileType[];
}

export class createCoachDto {
	@ApiProperty({
		type: String,
		example: 'ali',
	})
	@IsString()
	fullName: string;

	// @ApiProperty({
	// 	type: String,
	// 	example: 'ahmed',
	// })
	// @IsString()
	// lastName: string;

	@ApiProperty({
		type: String,
		example: '01003020923',
	})
	@IsString()
	phone: string;
	@ApiProperty({
		type: String,
		example: 'ali@me.com',
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
		enum: ['female', 'other', 'male'],
	})
	@IsEnum(Gender)
	@IsOptional()
	gender: Gender;

	@ApiProperty({ type: CreateCoachViewDto })
	@ValidateNested({ each: true })
	@Type(() => CreateCoachViewDto)
	coachView: CreateCoachViewDto;

	@ApiProperty({
		format: 'binary',
		description: 'CV file',
	})
	cv: FileType;

	@ApiProperty({
		type: 'array',
		items: {
			format: 'binary',
		},
		description: 'Certificate files',
	})
	certificates: FileType[];
}

export class createSupplierDto {
	@ApiProperty({
		type: String,
		example: 'Abd El-Rahman',
	})
	@IsString()
	fullName: string;

	// @ApiProperty({
	// 	type: String,
	// 	example: 'Negm',
	// })
	// @IsString()
	// lastName: string;

	@ApiProperty({
		type: String,
		example: '01001020923',
	})
	@IsString()
	phone: string;

	@ApiProperty({
		type: String,
		example: 'Negm@me.com',
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
		enum: ['female', 'other', 'male'],
	})
	@IsEnum(Gender)
	@IsOptional()
	gender: Gender;

	@ApiProperty({ type: CreateSupplierViewDto })
	@ValidateNested({ each: true })
	@Type(() => CreateSupplierViewDto)
	supplierView: CreateSupplierViewDto;

	@ApiProperty({
		format: 'binary',
		description: 'taxCard file',
	})
	taxCard: FileType;

	@ApiProperty({
		format: 'binary',
		description: 'commercialRegister file',
	})
	commercialRegister: FileType;
}

export class VerifyUserDto {
	@ApiProperty({
		type: String,
		example: '123456',
	})
	@IsString()
	otp: string;
}
