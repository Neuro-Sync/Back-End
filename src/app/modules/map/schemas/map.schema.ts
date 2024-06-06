import mongoose, { HydratedDocument } from 'mongoose';

import { CompanionDocument } from '@modules/companions/companion/schemas';
import { PatientDocument } from '@modules/patients/patient/schema/patient.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MapType } from '../enums';

export type MapDocument = HydratedDocument<Map>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Map {
	@Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
	owner: PatientDocument | CompanionDocument;

	@Prop({ type: String })
	latitude: string;

	@Prop({ type: String })
	longitude: string;

	@Prop({ type: String, enum: Object.values(MapType), required: true })
	mapType: string;
}

export const MapSchema = SchemaFactory.createForClass(Map);
