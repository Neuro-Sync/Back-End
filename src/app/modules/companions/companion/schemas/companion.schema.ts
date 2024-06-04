import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressDocument } from '@shared/address/schemas/address.schema';
import { Gender } from '@shared/enums';
import { ImageDocument } from '@shared/media/schemas/image.schema';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export type CompanionDocument = HydratedDocument<Companion>;

@Schema({
	timestamps: true,
	versionKey: false,
	virtuals: true,
	toJSON: { virtuals: true },
})
export class Companion {
	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: String, required: true, unique: true })
	email: string;

	@Prop({ type: String, required: true, unique: true })
	phone: string;

	@Prop({ type: String, required: true })
	password: string;

	@Prop({ type: Boolean, default: false })
	isVerified?: boolean;

	@Prop({ type: Boolean, default: false })
	isSuspended?: boolean;

	@Prop({ type: Boolean, default: true })
	isActive?: boolean;

	@Prop({ type: Boolean, default: false })
	isConnected?: boolean;

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

	async comparePassword(candidatePassword: string): Promise<boolean> {
		const [storedHash, salt] = this.password.split('.');
		const hash = (await scrypt(candidatePassword, salt, 32)) as Buffer;
		if (storedHash !== hash.toString('hex')) return false;
	}
}

export const CompanionSchema = SchemaFactory.createForClass(Companion);

CompanionSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	const salt = randomBytes(8).toString('hex');
	const hash = (await scrypt(this.password, salt, 32)) as Buffer;
	this.password = `${hash.toString('hex')}.${salt}`;
	this.passwordChangedAt = new Date(Date.now() - 1000);

	next();
});
