import { GetFloristViewDto } from '@modules/floweriests/floweriest/dtos/get-florist-view.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GetImageDto } from '../../../../shared/media/dtos/get-image.dto';
import { GetCoachViewDto } from '../../../customers/customer/dtos/get-coach-view.dto';
import { GetSupplierViewDto } from '../../../customers/customer/dtos/get-supplier-view.dto';

export class GetCustomerSignupDto {
	@ApiProperty({
		type: String,
		example: '5f4f4e3c4a7f3b001f7d7f3b',
	})
	@Expose()
	_id: string;

	@ApiProperty({
		type: [String],
		example: ['customer'],
	})
	@Expose()
	profiles: [];

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

export class GetCustomerSignupDtoWithTokens {
	@ApiProperty({
		type: GetCustomerSignupDto,
	})
	@Expose()
	user: GetCustomerSignupDto;

	@ApiProperty({
		type: String,
		example:
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJmaXJzdE5hbWUiOiJNb2hhbWVkIiwibGFzdE5hbWUiOiJBYm8gRWwtU2VvdWQiLCJlbWFpbCI6Im1vaGFtZWRhYm9lbHNlb3VkQHN0ZC5tYW5zLmVkdS5lZyIsInBob25lIjoiMDEwMDcwNDU5OTIiLCJwYXNzd29yZCI6IjAwOGY5Yzc1NDI1MzVkMWExZWU5NWZjNmNiMDQxMjlhNmIxNzRmZmJmYzBlZDZhNGYyNzM0NDcwMjRjZDg1ZWYuMTIzMTdmN2U1NTE0MjAyZiIsInJvbGUiOiJ1c2VyIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaXNTdXNwZW5kZWQiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiZ2VuZGVyIjoibWFsZSIsImlzRmxvd2VyaWVzdCI6ZmFsc2UsImlzU3VwcGxpZXIiOmZhbHNlLCJpc0NvYWNoIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNC0wNS0wM1QyMDoyMzo0OS4yNzZaIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0wNFQwODowODoyOC4xNzZaIiwicGFzc3dvcmRDaGFuZ2VkQXQiOiIyMDI0LTA1LTA0VDA4OjA4OjI3LjI0NVoiLCJmdWxsTmFtZSI6Ik1vaGFtZWQgQWJvIEVsLVNlb3VkIiwicHJvZmlsZXMiOlsiQ3VzdG9tZXIiXSwiaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJzZXNzaW9uIjoiNjYzNWVkMDIzNWVmNjllMTFlNzFjNGU1IiwiaWF0IjoxNzE0ODEwMTE0LCJleHAiOjE3MTQ4MTAxMTR9.mNzOi75OQB8Ycd7NDTE58jQCHEKJ78Bopf1D6kOxyLyH0cTh8Z1zOmnEXQZGn8I7dPrXtx-EW0N-Pc-YlJFY7ZGDKwfOT-p7HC4qAj3KBMZS_EsBrjNnZ23h_w79sWEwxbB3Rss3askNlGbvsNXVJl6vY2gjV2txyA9JeiVgJYbvoO49uE-EMTeMjQ_rUKSqcj3KXoocH_vwVY1ndZTtrNbw4OQZT5f5MkzKRY3PUeJxehxCPPdeAgta5Iq3lO1OLIfdKfvnC5ZJZROUVaokFCKohMvBHkpCUFxjz3-fW1SYCeimHWYOkLTn0NOVSTfowF6rdoumnis227YO14rcCQ',
	})
	@Expose()
	accessToken: string;
}

export class GetCoachSignupDto {
	@ApiProperty({
		type: String,
		example: '5f4f4e3c4a7f3b001f7d7f2l',
	})
	@Expose()
	_id: string;

	// @ApiProperty({
	// 	type: String,
	// 	example: 'ali ahmed',
	// })
	// @Expose()
	// fullName: string;

	@ApiProperty({
		type: [String],
		example: ['customer', 'coach'],
	})
	@Expose()
	profiles: [];

	@ApiProperty({
		type: String,
		example: 'ali',
	})
	@Expose()
	fullName: string;

	// @ApiProperty({
	// 	type: String,
	// 	example: 'ahmed',
	// })
	// @Expose()
	// lastName: string;

	@ApiProperty({
		type: String,
		example: 'ali@me.com',
	})
	@Expose()
	email: string;

	@ApiProperty({
		type: String,
		example: '01003020923',
	})
	@Expose()
	phone: string;

	@ApiProperty({
		type: String,
		example: 'user',
	})
	@Expose()
	role: string;

	@ApiProperty({
		type: String,
		example:
			'https://res.cloudinary.com/di6nk1mov/image/upload/v1715162527/kmrijykwppzfmx3ojpjp.jpg',
	})
	@Expose()
	profilePicture: string;

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

	@ApiProperty({
		type: GetCoachViewDto,
	})
	@Expose()
	coachView: GetCoachViewDto;
}

export class GetCoachSignupDtoWithTokens {
	@ApiProperty({
		type: GetCoachSignupDto,
	})
	@Expose()
	user: GetCoachSignupDto;

	@ApiProperty({
		type: String,
		example:
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJmaXJzdE5hbWUiOiJNb2hhbWVkIiwibGFzdE5hbWUiOiJBYm8gRWwtU2VvdWQiLCJlbWFpbCI6Im1vaGFtZWRhYm9lbHNlb3VkQHN0ZC5tYW5zLmVkdS5lZyIsInBob25lIjoiMDEwMDcwNDU5OTIiLCJwYXNzd29yZCI6IjAwOGY5Yzc1NDI1MzVkMWExZWU5NWZjNmNiMDQxMjlhNmIxNzRmZmJmYzBlZDZhNGYyNzM0NDcwMjRjZDg1ZWYuMTIzMTdmN2U1NTE0MjAyZiIsInJvbGUiOiJ1c2VyIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaXNTdXNwZW5kZWQiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiZ2VuZGVyIjoibWFsZSIsImlzRmxvd2VyaWVzdCI6ZmFsc2UsImlzU3VwcGxpZXIiOmZhbHNlLCJpc0NvYWNoIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNC0wNS0wM1QyMDoyMzo0OS4yNzZaIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0wNFQwODowODoyOC4xNzZaIiwicGFzc3dvcmRDaGFuZ2VkQXQiOiIyMDI0LTA1LTA0VDA4OjA4OjI3LjI0NVoiLCJmdWxsTmFtZSI6Ik1vaGFtZWQgQWJvIEVsLVNlb3VkIiwicHJvZmlsZXMiOlsiQ3VzdG9tZXIiXSwiaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJzZXNzaW9uIjoiNjYzNWVkMDIzNWVmNjllMTFlNzFjNGU1IiwiaWF0IjoxNzE0ODEwMTE0LCJleHAiOjE3MTQ4MTAxMTR9.mNzOi75OQB8Ycd7NDTE58jQCHEKJ78Bopf1D6kOxyLyH0cTh8Z1zOmnEXQZGn8I7dPrXtx-EW0N-Pc-YlJFY7ZGDKwfOT-p7HC4qAj3KBMZS_EsBrjNnZ23h_w79sWEwxbB3Rss3askNlGbvsNXVJl6vY2gjV2txyA9JeiVgJYbvoO49uE-EMTeMjQ_rUKSqcj3KXoocH_vwVY1ndZTtrNbw4OQZT5f5MkzKRY3PUeJxehxCPPdeAgta5Iq3lO1OLIfdKfvnC5ZJZROUVaokFCKohMvBHkpCUFxjz3-fW1SYCeimHWYOkLTn0NOVSTfowF6rdoumnis227YO14rcCQ',
	})
	@Expose()
	accessToken: string;
}

export class GetFloristSignupDto {
	@ApiProperty({
		type: String,
		example: '5f4f4e3c4a7f3b001f7d7f3l',
	})
	@Expose()
	_id: string;

	@ApiProperty({
		type: [String],
		example: ['Customer', 'Florist'],
	})
	@Expose()
	profiles: [];

	@ApiProperty({
		type: String,
		example: 'maes',
	})
	@Expose()
	fullName: string;

	@ApiProperty({
		type: String,
		example: 'tro@me.com',
	})
	@Expose()
	email: string;

	@ApiProperty({
		type: String,
		example: '01003030993',
	})
	@Expose()
	phone: string;

	@ApiProperty({
		type: String,
		example: 'user',
	})
	@Expose()
	role: string;

	@ApiProperty({
		type: String,
		example:
			'https://res.cloudinary.com/di6nk1mov/image/upload/v1715162527/kmrijykwppzfmx3ojpjp.jpg',
	})
	@Expose()
	profilePicture: string;

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

	@ApiProperty({
		type: GetFloristViewDto,
	})
	@Expose()
	floristView: GetFloristViewDto;
}

export class GetFloristSignupDtoWithTokens {
	@ApiProperty({
		type: GetFloristSignupDto,
	})
	@Expose()
	user: GetFloristSignupDto;

	@ApiProperty({
		type: String,
		example:
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJmaXJzdE5hbWUiOiJNb2hhbWVkIiwibGFzdE5hbWUiOiJBYm8gRWwtU2VvdWQiLCJlbWFpbCI6Im1vaGFtZWRhYm9lbHNlb3VkQHN0ZC5tYW5zLmVkdS5lZyIsInBob25lIjoiMDEwMDcwNDU5OTIiLCJwYXNzd29yZCI6IjAwOGY5Yzc1NDI1MzVkMWExZWU5NWZjNmNiMDQxMjlhNmIxNzRmZmJmYzBlZDZhNGYyNzM0NDcwMjRjZDg1ZWYuMTIzMTdmN2U1NTE0MjAyZiIsInJvbGUiOiJ1c2VyIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaXNTdXNwZW5kZWQiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiZ2VuZGVyIjoibWFsZSIsImlzRmxvd2VyaWVzdCI6ZmFsc2UsImlzU3VwcGxpZXIiOmZhbHNlLCJpc0NvYWNoIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNC0wNS0wM1QyMDoyMzo0OS4yNzZaIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0wNFQwODowODoyOC4xNzZaIiwicGFzc3dvcmRDaGFuZ2VkQXQiOiIyMDI0LTA1LTA0VDA4OjA4OjI3LjI0NVoiLCJmdWxsTmFtZSI6Ik1vaGFtZWQgQWJvIEVsLVNlb3VkIiwicHJvZmlsZXMiOlsiQ3VzdG9tZXIiXSwiaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJzZXNzaW9uIjoiNjYzNWVkMDIzNWVmNjllMTFlNzFjNGU1IiwiaWF0IjoxNzE0ODEwMTE0LCJleHAiOjE3MTQ4MTAxMTR9.mNzOi75OQB8Ycd7NDTE58jQCHEKJ78Bopf1D6kOxyLyH0cTh8Z1zOmnEXQZGn8I7dPrXtx-EW0N-Pc-YlJFY7ZGDKwfOT-p7HC4qAj3KBMZS_EsBrjNnZ23h_w79sWEwxbB3Rss3askNlGbvsNXVJl6vY2gjV2txyA9JeiVgJYbvoO49uE-EMTeMjQ_rUKSqcj3KXoocH_vwVY1ndZTtrNbw4OQZT5f5MkzKRY3PUeJxehxCPPdeAgta5Iq3lO1OLIfdKfvnC5ZJZROUVaokFCKohMvBHkpCUFxjz3-fW1SYCeimHWYOkLTn0NOVSTfowF6rdoumnis227YO14rcCQ',
	})
	@Expose()
	accessToken: string;
}

export class GetSupplierSignupDto {
	@ApiProperty({
		type: String,
		example: '5f4f4e3c4a7f3c001f7d7f2l',
	})
	@Expose()
	_id: string;

	// @ApiProperty({
	// 	type: String,
	// 	example: 'Abd El-Rahman Negm',
	// })
	// @Expose()
	// fullName: string;

	@ApiProperty({
		type: [String],
		example: ['Customer', 'Supplier'],
	})
	@Expose()
	profiles: [];

	@ApiProperty({
		type: String,
		example: 'Abd El-Rahman',
	})
	@Expose()
	fullName: string;

	// @ApiProperty({
	// 	type: String,
	// 	example: 'Negm',
	// })
	// @Expose()
	// lastName: string;

	@ApiProperty({
		type: String,
		example: 'Negm@me.com',
	})
	@Expose()
	email: string;

	@ApiProperty({
		type: String,
		example: '01001020923',
	})
	@Expose()
	phone: string;

	@ApiProperty({
		type: String,
		example: 'user',
	})
	@Expose()
	role: string;

	@ApiProperty({
		type: String,
		example:
			'https://res.cloudinary.com/di6nk1mov/image/upload/v1715162527/kmrijykwppzfmx3ojpjp.jpg',
	})
	@Expose()
	profilePicture: string;

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

	@ApiProperty({
		type: GetSupplierViewDto,
	})
	@Expose()
	supplierView: GetSupplierViewDto;
}

export class GetSupplierSignupDtoWithTokens {
	@ApiProperty({
		type: GetSupplierSignupDto,
	})
	@Expose()
	user: GetSupplierSignupDto;

	@ApiProperty({
		type: String,
		example:
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJmaXJzdE5hbWUiOiJNb2hhbWVkIiwibGFzdE5hbWUiOiJBYm8gRWwtU2VvdWQiLCJlbWFpbCI6Im1vaGFtZWRhYm9lbHNlb3VkQHN0ZC5tYW5zLmVkdS5lZyIsInBob25lIjoiMDEwMDcwNDU5OTIiLCJwYXNzd29yZCI6IjAwOGY5Yzc1NDI1MzVkMWExZWU5NWZjNmNiMDQxMjlhNmIxNzRmZmJmYzBlZDZhNGYyNzM0NDcwMjRjZDg1ZWYuMTIzMTdmN2U1NTE0MjAyZiIsInJvbGUiOiJ1c2VyIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaXNTdXNwZW5kZWQiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiZ2VuZGVyIjoibWFsZSIsImlzRmxvd2VyaWVzdCI6ZmFsc2UsImlzU3VwcGxpZXIiOmZhbHNlLCJpc0NvYWNoIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNC0wNS0wM1QyMDoyMzo0OS4yNzZaIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0wNFQwODowODoyOC4xNzZaIiwicGFzc3dvcmRDaGFuZ2VkQXQiOiIyMDI0LTA1LTA0VDA4OjA4OjI3LjI0NVoiLCJmdWxsTmFtZSI6Ik1vaGFtZWQgQWJvIEVsLVNlb3VkIiwicHJvZmlsZXMiOlsiQ3VzdG9tZXIiXSwiaWQiOiI2NjM1NDdkNWI4ZWM2ODkzZmUxM2MwYzQiLCJzZXNzaW9uIjoiNjYzNWVkMDIzNWVmNjllMTFlNzFjNGU1IiwiaWF0IjoxNzE0ODEwMTE0LCJleHAiOjE3MTQ4MTAxMTR9.mNzOi75OQB8Ycd7NDTE58jQCHEKJ78Bopf1D6kOxyLyH0cTh8Z1zOmnEXQZGn8I7dPrXtx-EW0N-Pc-YlJFY7ZGDKwfOT-p7HC4qAj3KBMZS_EsBrjNnZ23h_w79sWEwxbB3Rss3askNlGbvsNXVJl6vY2gjV2txyA9JeiVgJYbvoO49uE-EMTeMjQ_rUKSqcj3KXoocH_vwVY1ndZTtrNbw4OQZT5f5MkzKRY3PUeJxehxCPPdeAgta5Iq3lO1OLIfdKfvnC5ZJZROUVaokFCKohMvBHkpCUFxjz3-fW1SYCeimHWYOkLTn0NOVSTfowF6rdoumnis227YO14rcCQ',
	})
	@Expose()
	accessToken: string;
}

export class GetCustomerIdDto {
	@ApiProperty({
		type: String,
		example: '5f4f4e3c4a7f3b001f7d7f3b',
	})
	@Expose()
	id: string;
}

export class LoggedInDTO {
	@ApiProperty({
		type: GetCustomerSignupDto,
	})
	@Expose()
	user: GetCustomerSignupDto;

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
