import { registerAs } from '@nestjs/config';

export default registerAs(
	'database',
	(): Record<string, string | number> => ({
		local_url: process.env.DATABASE_LOCAL_URL,
		url: process.env.DATABASE_URL.replace('<user_name>', process.env.DATABASE_USER)
			.replace('<password>', process.env.DATABASE_PASSWORD)
			.replace('<db_name>', process.env.DATABASE_NAME),
		name: process.env.DATABASE_NAME,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT) || 27017,
	}),
);
