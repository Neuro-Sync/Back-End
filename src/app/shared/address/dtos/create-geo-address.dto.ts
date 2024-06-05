import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsLatitude, IsLongitude, IsOptional } from 'class-validator';
import { AddressType } from '../enums';

export class CreateGeoAddressDto {
	@ApiProperty({
		type: String,
		example: '37.7749',
	})
	@IsLatitude({ message: 'Latitude must be a valid latitude' })
	latitude: string;

	@ApiProperty({
		type: String,
		example: '-122.4194',
	})
	@IsLongitude({ message: 'Longitude must be a valid longitude' })
	longitude: string;

	@IsOptional()
	@ApiProperty({
		type: String,
		example: 'home',
	})
	@IsEnum(Object.values(AddressType), { message: 'Invalid address type' })
	addressType: string;
}
