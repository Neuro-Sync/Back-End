import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MimeImageType } from '../enums';

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
		enum: Object.values(MimeImageType).map((value) => `image/${value}`),
		required: true,
	})
	mime: string;

	@Prop({ type: String, required: true })
	cloudinaryId: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
