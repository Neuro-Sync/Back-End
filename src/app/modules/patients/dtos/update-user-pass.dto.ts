import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserPassDto {
	@ApiProperty({
		type: String,
		example: 'password',
	})
	@IsString()
	password: string;
}
