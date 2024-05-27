import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetPdfDto {
	@ApiProperty({
		type: String,
		example:
			'https://res.cloudinary.com/di6nk1mov/image/upload/v1715162527/kmrijykwppzfmx3ojpjp.jpg',
	})
	@Expose()
	pdfUrl: string;
}
