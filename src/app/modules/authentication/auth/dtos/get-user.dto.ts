import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GetImageDto } from '../../../../shared/media/dtos/get-image.dto';

export class GetPatientSignupDto {
	@ApiProperty({
		type: String,
		example: '5f4f4e3c4a7f3b001f7d7f3b',
	})
	@Expose()
	_id: string;

	@ApiProperty({
		type: String,
		example: 'John',
	})
	@Expose()
	fullName: string;

	@ApiProperty({
		type: String,
		example: 'mo@me.com',
	})
	@Expose()
	email: string;

	@ApiProperty({
		type: String,
		example: '01002020993',
	})
	@Expose()
	phone: string;

	@ApiProperty({
		type: GetImageDto,
	})
	@Expose()
	profilePicture: GetImageDto;

	@ApiProperty({
		type: String,
		example: 'user',
	})
	@Expose()
	role: string;

	@ApiProperty({
		type: Boolean,
		example: false,
	})
	@Expose()
	isVerified: boolean;

	@ApiProperty({
		type: Boolean,
		example: false,
	})
	@Expose()
	isSuspended: boolean;

	@ApiProperty({
		type: Boolean,
		example: true,
	})
	@Expose()
	isActive: boolean;

	@ApiProperty({
		type: String,
		example: 'male',
		enum: ['female', 'other', 'male'],
	})
	@Expose()
	gender: string;
}

export class GetPatientSignupDtoWithTokens {
	@ApiProperty({
		type: GetPatientSignupDto,
	})
	@Expose()
	user: GetPatientSignupDto;

	@ApiProperty({
		type: String,
		example:
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJmaXJzdE5hbWUiOiJNb2hhbWVkIiwibGFzdE5hbWUiOiJBYm8gRWwtU2VvdWQiLCJlbWFpbCI6Im1vaGFtZWRhYm9lbHNlb3VkQHN0ZC5tYW5zLmVkdS5lZyIsInBob25lIjoiMDEwMDcwNDU5OTIiLCJwYXNzd29yZCI6IjAwOGY5Yzc1NDI1MzVkMWExZWU5NWZjNmNiMDQxMjlhNmIxNzRmZmJmYzBlZDZhNGYyNzM0NDcwMjRjZDg1ZWYuMTIzMTdmN2U1NTE0MjAyZiIsInJvbGUiOiJ1c2VyIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaXNTdXNwZW5kZWQiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiZ2VuZGVyIjoibWFsZSIsImlzRmxvd2VyaWVzdCI6ZmFsc2UsImlzU3VwcGxpZXIiOmZhbHNlLCJpc0NvYWNoIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNC0wNS0wM1QyMDoyMzo0OS4yNzZaIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0wNFQwODowODoyOC4xNzZaIiwicGFzc3dvcmRDaGFuZ2VkQXQiOiIyMDI0LTA1LTA0VDA4OjA4OjI3LjI0NVoiLCJmdWxsTmFtZSI6Ik1vaGFtZWQgQWJvIEVsLVNlb3VkIiwicHJvZmlsZXMiOlsiQ3VzdG9tZXIiXSwiaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJzZXNzaW9uIjoiNjYzNWVkMDIzNWVmNjllMTFlNzFjNGU1IiwiaWF0IjoxNzE0ODEwMTE0LCJleHAiOjE3MTQ4MTAxMTR9.mNzOi75OQB8Ycd7NDTE58jQCHEKJ78Bopf1D6kOxyLyH0cTh8Z1zOmnEXQZGn8I7dPrXtx-EW0N-Pc-YlJFY7ZGDKwfOT-p7HC4qAj3KBMZS_EsBrjNnZ23h_w79sWEwxbB3Rss3askNlGbvsNXVJl6vY2gjV2txyA9JeiVgJYbvoO49uE-EMTeMjQ_rUKSqcj3KXoocH_vwVY1ndZTtrNbw4OQZT5f5MkzKRY3PUeJxehxCPPdeAgta5Iq3lO1OLIfdKfvnC5ZJZROUVaokFCKohMvBHkpCUFxjz3-fW1SYCeimHWYOkLTn0NOVSTfowF6rdoumnis227YO14rcCQ',
	})
	@Expose()
	accessToken: string;
}

export class GetPatientIdDto {
	@ApiProperty({
		type: String,
		example: '5f4f4e3c4a7f3b001f7d7f3b',
	})
	@Expose()
	id: string;
}

export class LoggedInDTO {
	@ApiProperty({
		type: GetPatientSignupDto,
	})
	@Expose()
	user: GetPatientSignupDto;

	@ApiProperty({
		type: String,
		example:
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJmaXJzdE5hbWUiOiJNb2hhbWVkIiwibGFzdE5hbWUiOiJBYm8gRWwtU2VvdWQiLCJlbWFpbCI6Im1vaGFtZWRhYm9lbHNlb3VkQHN0ZC5tYW5zLmVkdS5lZyIsInBob25lIjoiMDEwMDcwNDU5OTIiLCJwYXNzd29yZCI6IjAwOGY5Yzc1NDI1MzVkMWExZWU5NWZjNmNiMDQxMjlhNmIxNzRmZmJmYzBlZDZhNGYyNzM0NDcwMjRjZDg1ZWYuMTIzMTdmN2U1NTE0MjAyZiIsInJvbGUiOiJ1c2VyIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaXNTdXNwZW5kZWQiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiZ2VuZGVyIjoibWFsZSIsImlzRmxvd2VyaWVzdCI6ZmFsc2UsImlzU3VwcGxpZXIiOmZhbHNlLCJpc0NvYWNoIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNC0wNS0wM1QyMDoyMzo0OS4yNzZaIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0wNFQwODowODoyOC4xNzZaIiwicGFzc3dvcmRDaGFuZ2VkQXQiOiIyMDI0LTA1LTA0VDA4OjA4OjI3LjI0NVoiLCJmdWxsTmFtZSI6Ik1vaGFtZWQgQWJvIEVsLVNlb3VkIiwicHJvZmlsZXMiOlsiQ3VzdG9tZXIiXSwiaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJzZXNzaW9uIjoiNjYzNWVkMDIzNWVmNjllMTFlNzFjNGU1IiwiaWF0IjoxNzE0ODEwMTE0LCJleHAiOjE3MTQ4MTAxMTR9.mNzOi75OQB8Ycd7NDTE58jQCHEKJ78Bopf1D6kOxyLyH0cTh8Z1zOmnEXQZGn8I7dPrXtx-EW0N-Pc-YlJFY7ZGDKwfOT-p7HC4qAj3KBMZS_EsBrjNnZ23h_w79sWEwxbB3Rss3askNlGbvsNXVJl6vY2gjV2txyA9JeiVgJYbvoO49uE-EMTeMjQ_rUKSqcj3KXoocH_vwVY1ndZTtrNbw4OQZT5f5MkzKRY3PUeJxehxCPPdeAgta5Iq3lO1OLIfdKfvnC5ZJZROUVaokFCKohMvBHkpCUFxjz3-fW1SYCeimHWYOkLTn0NOVSTfowF6rdoumnis227YO14rcCQ',
	})
	@Expose()
	accessToken: string;

	// @ApiProperty({
	// 	type: String,
	// 	example:
	// 		'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJmaXJzdE5hbWUiOiJNb2hhbWVkIiwibGFzdE5hbWUiOiJBYm8gRWwtU2VvdWQiLCJlbWFpbCI6Im1vaGFtZWRhYm9lbHNlb3VkQHN0ZC5tYW5zLmVkdS5lZyIsInBob25lIjoiMDEwMDcwNDU5OTIiLCJwYXNzd29yZCI6IjAwOGY5Yzc1NDI1MzVkMWExZWU5NWZjNmNiMDQxMjlhNmIxNzRmZmJmYzBlZDZhNGYyNzM0NDcwMjRjZDg1ZWYuMTIzMTdmN2U1NTE0MjAyZiIsInJvbGUiOiJ1c2VyIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaXNTdXNwZW5kZWQiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiZ2VuZGVyIjoibWFsZSIsImlzRmxvd2VyaWVzdCI6ZmFsc2UsImlzU3VwcGxpZXIiOmZhbHNlLCJpc0NvYWNoIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNC0wNS0wM1QyMDoyMzo0OS4yNzZaIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0wNFQwODowODoyOC4xNzZaIiwicGFzc3dvcmRDaGFuZ2VkQXQiOiIyMDI0LTA1LTA0VDA4OjA4OjI3LjI0NVoiLCJmdWxsTmFtZSI6Ik1vaGFtZWQgQWJvIEVsLVNlb3VkIiwicHJvZmlsZXMiOlsiQ3VzdG9tZXIiXSwiaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJzZXNzaW9uIjoiNjYzNWVkMDIzNWVmNjllMTFlNzFjNGU1IiwiaWF0IjoxNzE0ODEwMTE0LCJleHAiOjE3MTUyNDIxMTR9.LFbpFsmYvcMz6B-wIjTAKYeLI6cqXmnzBxywOksqHORTk5bJN0KvScUMjCA9lGGhG72MFAxkEwAk53fKJAoZfHAfR8QAaYhoT1FnF580lxv9lrkpTNFhEHdIJhs0kT20r7igknlseIqDqi5N2z4vi3zipGRW4_t6g7itkcLb4-6i6qoCRMA1uCBOhAsq5v4MyixwSAfSjdHVmLjKdcvTqx3FWmool-M8xG5dY66kRvmERXXG0Cqz0J-XA9a6qbIVwAaML-tCANugPyuQZdw2RF0-ZWiMKB9zlIAvBY7Xarvqad4kToeZtWq067lTqeIXL-KBIa1kWf5L1mBnT1fPDA',
	// })
	// @Expose()
	// refreshToken: string;
}
