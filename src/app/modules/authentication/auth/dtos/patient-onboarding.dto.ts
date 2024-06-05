import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PatientOnboardingDto {
	@ApiProperty({
		description: 'name for the companion',
		example: 'Mohamed medhat',
	})
	@IsString({ message: 'name must be a string' })
	@IsNotEmpty({ message: 'name is required' })
	fullName: string;

	@ApiProperty({
		description: 'Email for the companion',
		example: 'mohamed.medhat2121@gmail.com',
	})
	@IsEmail({}, { message: 'Invalid email format' })
	@IsNotEmpty({ message: 'Email is required' })
	email: string;

	@ApiProperty({
		description: 'Date of birth for the patient',
		example: '1999-01-01',
	})
	@IsString({ message: 'dateOfBirth must be a string' })
	@IsNotEmpty({ message: 'dateOfBirth is required' })
	dateOfBirth: Date;
}
