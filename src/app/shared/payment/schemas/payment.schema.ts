import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Currency, PaymentStatus } from '../enums';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({
	timestamps: true,
	versionKey: false,
	virtuals: true,
	toJSON: { virtuals: true },
})

//NOTE: this payment schema is used to store payment details of a user
//NOTE: this will be created by the admin of the system to store the payment details of a user
//NOTE: if the payment is successful, the status will be set to 'success'
export class Payment {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true })
	user: string;

	@Prop({ type: Number, required: true })
	amount: number;

	@Prop({ type: String, required: true })
	paymentMethod: string;

	@Prop({ type: Date, required: false })
	paidAt?: Date;

	@Prop({ type: String, required: false })
	transactionId?: string;

	@Prop({ type: String, enum: Object.values(Currency), required: true })
	currency: string;

	@Prop({ type: String, enum: Object.values(PaymentStatus), required: true })
	status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
