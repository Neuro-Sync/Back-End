import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsLatitude, IsLongitude, IsOptional } from 'class-validator';
import { MapType } from '../enums';

export class CreateGeoMapDto {
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
	@IsEnum(Object.values(MapType), { message: 'Invalid map type' })
	mapType: string;
}
