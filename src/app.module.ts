import { PatientModule } from '@modules/patients/patient/patient.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from '@shared/address/address.module';
import { CloudinaryModule } from '@shared/cloudinary/cloudinary.module';
import Configs from '@shared/config';
import { MailerModule } from '@shared/mailer/mailer.module';
import { ImageModule } from '@shared/media/media.module';
import { userDeserializationMiddleware } from '@shared/middlewares/user-deserialization.middleware';
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
		TokenModule,
		PatientModule,
		PaymentModule,
		ImageModule,
		CloudinaryModule,
		AddressModule,
		OtpModule,
		MailerModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(userDeserializationMiddleware).forRoutes('*');
	}
}
