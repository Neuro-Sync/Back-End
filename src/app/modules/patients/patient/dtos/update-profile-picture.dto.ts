import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProfilePictureDto {
	@ApiProperty({
		type: String,
		example: 'https://via.placeholder.com/150',
	})
	@IsString()
	profilePicture: string;
}
