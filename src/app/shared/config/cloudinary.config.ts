import { registerAs } from '@nestjs/config';

export default registerAs(
	'cloudinary',
	(): Record<string, string | number> => ({
		name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	}),
);
