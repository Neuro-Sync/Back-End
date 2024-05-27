import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

import { TokenTypes } from '../enums';

export type TokenDocument = HydratedDocument<Token>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Token {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	user: string;

	@Prop({ type: String, enum: Object.values(TokenTypes), required: true })
	type: string;

	@Prop({ type: Date, required: true })
	expiresAt: Date;

	@Prop({ type: String, required: true })
	token: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
