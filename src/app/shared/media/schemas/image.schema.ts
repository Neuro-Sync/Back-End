import { MimeType } from '../enums';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Image {
	@Prop({ type: String, required: true })
	imageUrl: string;

	@Prop({ type: String, required: true })
	previewUrl: string;

	@Prop({
		type: String,
		enum: Object.values(MimeType).map((value) => `image/${value}`),
		required: true,
	})
	mime: MimeType;

	@Prop({ type: String, required: true })
	cloudinaryId: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
