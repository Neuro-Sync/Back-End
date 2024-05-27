import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
	@ApiProperty({
		type: String,
		example: 'mohamedaboelseoud@std.mans.edu.eg',
	})
	@IsString()
	email: string;

	@ApiProperty({
		type: String,
		example: 'pass1221',
	})
	@IsString()
	password: string;
}
