import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PatientRepository } from './repositories/patient.repository';
import { PatientSchema } from './schema/patient.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Patient', schema: PatientSchema }])],
	controllers: [PatientController],
	providers: [PatientService, PatientRepository],
	exports: [PatientService, PatientRepository],
})
export class PatientModule {}
