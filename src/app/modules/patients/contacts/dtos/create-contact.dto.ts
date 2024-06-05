import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
	@ApiProperty({
		type: String,
		example: 'New',
	})
	@IsString({
		message: 'Name must be a string',
	})
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		type: String,
		example: '01028605670',
	})
	@IsString({
		message: 'Phone must be a string',
	})
	@IsNotEmpty()
	phone: string;
}
