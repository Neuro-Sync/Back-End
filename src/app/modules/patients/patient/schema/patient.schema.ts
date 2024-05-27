import { Gender, Role } from '@modules/patients/enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressDocument } from '@shared/address/schemas/address.schema';
import { ImageDocument } from '@shared/media/schemas/image.schema';
import { scrypt as _scrypt, randomBytes } from 'crypto';
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
	phone: string;

	@Prop({ type: String, required: true })
	password: string;

	@Prop({ type: String, required: true, enum: Object.values(Role) })
	role: Role;

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
	profilePicture: ImageDocument;

	@Prop({ type: Date })
	dateOfBirth?: Date;

	@Prop({ type: String, enum: Object.values(Gender) })
	gender?: Gender;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);

PatientSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	const salt = randomBytes(8).toString('hex');
	const hash = (await scrypt(this.password, salt, 32)) as Buffer;
	this.password = `${hash.toString('hex')}.${salt}`;
	this.passwordChangedAt = new Date(Date.now() - 1000);

	next();
});
