import mongoose, { HydratedDocument } from 'mongoose';

import { CompanionDocument } from '@modules/companions/companion/schemas';
import { PatientDocument } from '@modules/patients/patient/schema/patient.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressType } from '../enums';

export type AddressDocument = HydratedDocument<Address>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Address {
	@Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
	owner: PatientDocument | CompanionDocument;

	@Prop({ type: String })
	latitude: string;

	@Prop({ type: String })
	longitude: string;

	@Prop({ type: String, enum: Object.values(AddressType), required: true })
	addressType: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
