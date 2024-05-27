import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPostalCode, IsString } from 'class-validator';

export class CreateAddressDto {
	@ApiProperty({
		type: String,
		example: 'Saudi Arabia',
	})
	@IsString({ message: 'country must be a string' })
	country: string;

	@ApiProperty({
		type: String,
		example: 'Riyadh',
	})
	@IsString({
		message: 'state must be a string',
	})
	state: string;

	@ApiProperty({
		type: String,
		example: 'Riyadh',
	})
	@IsString({
		message: 'city must be a string',
	})
	city: string;

	@ApiProperty({
		type: String,
		example: 'Al-Malaz',
	})
	@IsString({
		message: 'street must be a string',
	})
	street: string;

	@ApiProperty({
		type: Number,
		example: 123456,
	})
	@IsNumber({ allowNaN: false }, { message: 'building number must be a number' })
	buildingNumber: number;

	@ApiProperty({
		type: Number,
		example: 123456,
	})
	@IsNumber({ allowNaN: false }, { message: 'floor number must be a number' })
	floorNumber: number;

	@ApiProperty({
		type: Number,
		example: 123456,
	})
	@IsNumber(
		{ allowNaN: false },
		{
			message: 'apartment number must be a number',
		},
	)
	apartmentNumber: number;

	@ApiProperty({
		type: String,
		example: 'Home sweet home',
	})
	@IsString({
		message: 'home description must be a string',
	})
	homeDescription: string;

	@ApiProperty({
		type: Number,
		example: 123456,
	})
	@IsOptional()
	@IsPostalCode('SA' || 'any', { message: 'postal code must be a valid postal code' })
	postalCode: number;
}
