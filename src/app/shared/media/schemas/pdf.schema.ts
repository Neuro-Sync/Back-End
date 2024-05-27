import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PdfDocument = HydratedDocument<Pdf>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Pdf {
	@Prop({ type: String, required: true })
	pdfUrl: string;

	@Prop({ type: String, required: true })
	cloudinaryId: string;
}

export const PdfSchema = SchemaFactory.createForClass(Pdf);
