import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { Token, TokenSchema } from './schemas/token.schema';
import { CustomerModule } from '../customer/customer.module';
import { AuthSessionModule } from '../../authentication/auth-session/auth-session.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
		JwtModule.registerAsync({
			useFactory: async () => {
				const options: JwtModuleOptions = {
					signOptions: {
						algorithm: 'RS256',
					},
					verifyOptions: {
						algorithms: ['RS256'],
					},
				};
				return options;
			},
		}),
		CustomerModule,
		AuthSessionModule,
	],
	providers: [TokenService],
	exports: [TokenService],
})
export class TokenModule {}
