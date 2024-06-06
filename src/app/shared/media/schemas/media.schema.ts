import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MediaType } from '../enums';
import { VideoDocument } from './Video.schema';
import { ImageDocument } from './image.schema';
import { PdfDocument } from './pdf.schema';

export type MediaDocument = HydratedDocument<Media>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Media {
	@Prop({ type: String, required: true, enum: Object.values(MediaType) })
	contentType: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
	contentId: VideoDocument | ImageDocument | PdfDocument;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
