import { CompanionDocument } from '@modules/companions/companion/schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressDocument } from '@shared/address/schemas/address.schema';
import { Gender } from '@shared/enums';
import { ImageDocument } from '@shared/media/schemas/image.schema';
import { scrypt as _scrypt } from 'crypto';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export type PatientDocument = HydratedDocument<Patient>;

@Schema({
	timestamps: true,
	versionKey: false,
	toJSON: { virtuals: true },
})
export class Patient {
	@Prop({ type: String, required: true })
	fullName: string;

	@Prop({ type: String, required: true, unique: true })
	email: string;

	@Prop({ type: String, required: true, unique: true })
	phone?: string;

	@Prop({ type: Boolean, default: false })
	isVerified?: boolean;

	@Prop({ type: Boolean, default: false })
	isSuspended?: boolean;

	@Prop({ type: Boolean, default: true })
	isActive?: boolean;

	@Prop({ type: Date })
	passwordChangedAt?: Date;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Address',
		autopopulate: true,
	})
	address?: AddressDocument;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Image',
		autopopulate: true,
	})
	profilePicture?: ImageDocument;

	@Prop({ type: Date })
	dateOfBirth: Date;

	@Prop({ type: String, enum: Object.values(Gender) })
	gender?: Gender;

	@Prop({ type: Boolean })
	isLinked?: boolean;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Companion',
	})
	companion?: CompanionDocument;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
