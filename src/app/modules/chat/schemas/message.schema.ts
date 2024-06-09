import { CompanionDocument } from '@modules/companions/companion/schemas';
import { MapDocument } from '@modules/map/schemas/map.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ImageDocument } from '@shared/media/schemas/image.schema';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({
	timestamps: true,
	versionKey: false,
	toJSON: { virtuals: true },
})
export class Message {
	@Prop({ type: String, required: true })
	content: string;

	@Prop({ type: String, required: true })
	sender: string;

	@Prop({ type: String, required: true })
	receiver: string;

	@Prop({ type: String, required: true })
	conversationId: string;

	@Prop({ type: Date })
	readAt: Date;

	@Prop({ type: Date })
	deliveredAt: Date;

	@Prop({ type: Boolean, default: false })
	isRead: boolean;

	@Prop({ type: Boolean, default: false })
	isDelivered: boolean;

	@Prop({ type: Boolean, default: false })
	isDeleted: boolean;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Image',
		autopopulate: true,
	})
	image?: ImageDocument;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Companion',
		autopopulate: true,
	})
	companion?: CompanionDocument;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Map',
		autopopulate: true,
	})
	map?: MapDocument;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
