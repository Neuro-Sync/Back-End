import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import Configs from '@shared/config';
import { userDeserializationMiddleware } from '@shared/middlewares/user-deserialization.middleware';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					uri: configService.get('database.url'),
					dbName: configService.get('database.name'),
					authSource: 'admin',
					connectionFactory: (connection): void => {
						// connection.plugin(require('mongoose-paginate-v2'));
						// eslint-disable-next-line @typescript-eslint/no-var-requires
						connection.plugin(require('mongoose-autopopulate'));
						return connection;
					},
				};
			},
		}),
		ConfigModule.forRoot({
			load: Configs,
			isGlobal: true,
			cache: true,
			ignoreEnvFile: false,
			envFilePath: `.env.${process.env.NODE_ENV}`,
		}),
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(userDeserializationMiddleware).forRoutes('*');
	}
}
