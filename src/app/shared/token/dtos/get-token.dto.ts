import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetTokenDto {
	@ApiProperty({
		type: String,
		example: '3156eb77e57ee13b1720abcf80b2f33520a47784103999efe2232524d684d7cd',
	})
	@Expose()
	token: string;
}
