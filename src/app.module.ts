import { AuthModule } from '@modules/authentication/auth/auth.module';
import { EntertainmentModule } from '@modules/entertainment/entertainment.module';
import { MapModule } from '@modules/map/map.module';
import { PatientModule } from '@modules/patients/patient/patient.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from '@shared/cloudinary/cloudinary.module';
import Configs from '@shared/config';
import { MailerModule } from '@shared/mailer/mailer.module';
import { MediaModule } from '@shared/media/media.module';
import { UserDeserializationMiddleware } from '@shared/middlewares/user-deserialization.middleware';
import { OtpModule } from '@shared/otp/otp.module';
import { PaymentModule } from '@shared/payment/payment.module';
import { TokenModule } from '@shared/token/token.module';

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
			envFilePath: `.env.development`,
		}),
		AuthModule,
		TokenModule,
		PatientModule,
		PaymentModule,
		MediaModule,
		EntertainmentModule,
		CloudinaryModule,
		MapModule,
		OtpModule,
		MailerModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(UserDeserializationMiddleware).forRoutes('*');
	}
}
