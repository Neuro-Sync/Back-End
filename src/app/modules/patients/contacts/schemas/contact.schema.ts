import mongoose, { HydratedDocument } from 'mongoose';

import { PatientDocument } from '@modules/patients/patient/schema/patient.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Contact {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'patient', required: true })
	patient: PatientDocument;

	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: String, required: true })
	phone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
