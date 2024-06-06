import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MimeVideoType } from '../enums';

export type VideoDocument = HydratedDocument<Video>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Video {
	@Prop({ type: String, required: true })
	VideoUrl: string;

	@Prop({ type: String, required: true })
	previewUrl: string;

	@Prop({
		type: String,
		enum: Object.values({ MimeVideoType }).map((value) => `Video/${value}`),
		required: true,
	})
	mime: string;

	@Prop({ type: String, required: true })
	cloudinaryId: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
