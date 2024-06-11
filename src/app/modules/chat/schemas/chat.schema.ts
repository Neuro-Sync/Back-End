import { CompanionDocument } from '@modules/companions/companion/schemas';
import { PatientDocument } from '@modules/patients/patient/schema/patient.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
	timestamps: true,
	versionKey: false,
	toJSON: { virtuals: true },
})
export class Chat {
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Companion',
		autopopulate: true,
	})
	companion: CompanionDocument;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Patient',
		autopopulate: true,
	})
	patient: PatientDocument;

	@Prop({
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: Message.name,
			},
		],
		default: [],
	})
	messages?: MessageDocument[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
