import { PatientModule } from '@modules/patients/patient/patient.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntertainmentController } from './entertainment.controller';
import { EntertainmentService } from './entertainment.service';
import { Entertainment, EntertainmentSchema } from './schema/entertainment.schema';

@Module({
	imports: [
		PatientModule,
		MongooseModule.forFeature([{ name: Entertainment.name, schema: EntertainmentSchema }]),
	],
	controllers: [EntertainmentController],
	providers: [EntertainmentService],
})
export class EntertainmentModule {}
