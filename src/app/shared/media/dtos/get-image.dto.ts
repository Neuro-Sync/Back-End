import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetImageDto {
	@ApiProperty({
		type: String,
		example: '5f4f4e3c4a7f3b001f7d7f3l',
	})
	@Expose()
	_id: string;

	@ApiProperty({
		type: String,
		example:
			'https://res.cloudinary.com/di6nk1mov/image/upload/v1715162527/kmrijykwppzfmx3ojpjp.jpg',
	})
	@Expose()
	imageUrl: string;

	@ApiProperty({
		type: String,
		example:
			'https://res.cloudinary.com/di6nk1mov/image/upload/v1715162527/kmrijykwppzfmx3ojpjp.jpg',
	})
	@Expose()
	previewUrl: string;
}
