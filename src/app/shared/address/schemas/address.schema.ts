import mongoose, { HydratedDocument } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressType } from '../enums';

export type AddressDocument = HydratedDocument<Address>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Address {
	@Prop({ type: String, enum: Object.values(AddressType), required: true })
	addressType: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true })
	owner: string;

	@Prop({ type: String })
	latitude?: string;

	@Prop({ type: String })
	longitude?: string;

	@Prop({ type: String })
	homeDescription?: string;

	@Prop({ type: String })
	street?: string;

	@Prop({ type: String })
	city?: string;

	@Prop({ type: String })
	state?: string;

	@Prop({ type: String })
	country?: string;

	@Prop({ type: Number })
	postalCode?: number;

	@Prop({ type: Number })
	buildingNumber?: number;

	@Prop({ type: Number })
	floorNumber?: number;

	@Prop({ type: Number })
	apartmentNumber?: number;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
