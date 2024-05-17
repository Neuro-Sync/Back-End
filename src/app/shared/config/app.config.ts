import { registerAs } from '@nestjs/config';

export default registerAs(
	'app',
	(): Record<string, any> => ({
		port: parseInt(process.env.PORT) || 3000,
		env: process.env.NODE_ENV || 'development',
		serverUrl: process.env.SERVER_URL,
		tax_price: process.env.TAX_PERCENTAGE || 0.14,
	}),
);
