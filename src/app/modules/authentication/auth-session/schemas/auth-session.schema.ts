import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { AuthSessionStatus } from '../enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthSessionDocument = HydratedDocument<AuthSession>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class AuthSession {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true })
	user: string;

	@Prop({ type: Date, required: true })
	expiresAt: Date;

	//FIXME we still need to think and understand this & make it required
	@Prop({ type: String })
	notificationSocketIds?: string[];

	//FIXME we still need to understand difference between valid and active  & make it required
	@Prop({ type: String, enum: Object.values(AuthSessionStatus) })
	status: string;
}

export const AuthSessionSchema = SchemaFactory.createForClass(AuthSession);
