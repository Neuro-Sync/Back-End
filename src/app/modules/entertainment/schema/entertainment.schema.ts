import mongoose, { HydratedDocument } from 'mongoose';

import { CompanionDocument } from '@modules/companions/companion/schemas';
import { PatientDocument } from '@modules/patients/patient/schema/patient.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MediaDocument } from '@shared/media/schemas/media.schema';

export type EntertainmentDocument = HydratedDocument<Entertainment>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Entertainment {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true })
	media: MediaDocument;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Companion', required: true })
	sender: CompanionDocument;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true })
	receiver: PatientDocument;

	@Prop({ type: Boolean, default: false })
	received?: boolean;
}

export const EntertainmentSchema = SchemaFactory.createForClass(Entertainment);
