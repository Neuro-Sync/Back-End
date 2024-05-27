import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude } from 'class-validator';

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
}
