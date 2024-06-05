import { AuthSessionModule } from '@modules/authentication/auth-session/auth-session.module';
import { CompanionModule } from '@modules/companions/companion/companion.module';
import { PatientModule } from '@modules/patients/patient/patient.module';
import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';
import { TokenService } from './token.service';

@Module({
	imports: [
		PatientModule,
		CompanionModule,
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
		PatientModule,
		AuthSessionModule,
	],
	providers: [TokenService],
	exports: [TokenService],
})
export class TokenModule {}
