import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSessionService } from './auth-session.service';
import { AuthSession, AuthSessionSchema } from './schemas/auth-session.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: AuthSession.name, schema: AuthSessionSchema }])],
	providers: [AuthSessionService],
	exports: [AuthSessionService],
})
export class AuthSessionModule {}
