import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

import { OtpTypes } from '../enums';

export type OtpDocument = HydratedDocument<Otp>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Otp {
	@Prop({ required: true })
	otp: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true })
	customer: string;

	@Prop({ enum: Object.values(OtpTypes), required: true })
	OtpType: string;

	@Prop({ type: Date })
	createdAt: Date;

	@Prop({ type: Date })
	expiresAt: Date;
}

const OtpSchema = SchemaFactory.createForClass(Otp);

OtpSchema.pre<OtpDocument>('save', function (next) {
	this.createdAt = new Date(Date.now());
	this.expiresAt = new Date(Date.now() + parseInt(process.env.OTP_EXPIRY_IN_MIN) * 60000);
	next();
});

export { OtpSchema };
