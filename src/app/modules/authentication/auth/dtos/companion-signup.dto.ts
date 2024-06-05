import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CompanionSignupDto {
	@ApiProperty({
		description: 'name for the companion',
		example: 'Mohamed medhat',
	})
	@IsString({ message: 'name must be a string' })
	@IsNotEmpty({ message: 'name is required' })
	name: string;

	@ApiProperty({
		description: 'Email for the companion',
		example: 'mohamed.medhat2121@gmail.com',
	})
	@IsEmail({}, { message: 'Invalid email format' })
	@IsNotEmpty({ message: 'Email is required' })
	email: string;

	@ApiProperty({
		description: 'Password for the companion',
		example: 'password123',
	})
	@IsString({ message: 'Password must be a string' })
	@IsNotEmpty({ message: 'Password is required' })
	@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
		message:
			'Password must contain at least one uppercase letter, one lowercase letter, and one number',
	})
	password: string;

	@ApiProperty({
		description: 'Password confirmation for the companion',
		example: 'password123',
	})
	@IsString({ message: 'confirmPassword must be a string' })
	@IsNotEmpty({ message: 'confirmPassword is required' })
	@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
		message:
			'confirmPassword must contain at least one uppercase letter, one lowercase letter, and one number',
	})
	confirmPassword: string;

	@ApiProperty({
		description: 'Optional phone number for the companion',
		example: '08012345678',
	})
	@IsString({ message: 'Phone number must be a string' })
	@IsNotEmpty({ message: 'Phone number is required' })
	phone: string;
}
