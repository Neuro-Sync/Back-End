import { registerAs } from '@nestjs/config';

export default registerAs(
	'app',
	(): Record<string, unknown> => ({
		port: parseInt(process.env.PORT) || 3000,
		env: process.env.NODE_ENV || 'development',
		serverUrl: process.env.SERVER_URL,
		tax_price: process.env.TAX_PERCENTAGE || 0.14,
		linkageSecret: process.env.LINKAGE_SECRET,
		linkageInitVector: process.env.LINKAGE_INIT_VECTOR,
	}),
);
