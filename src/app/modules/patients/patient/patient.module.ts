import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PatientSchema } from './schema/patient.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Patient', schema: PatientSchema }])],
	controllers: [PatientController],
	providers: [PatientService],
	exports: [PatientService],
})
export class PatientModule {}