import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type XlsxDocument = HydratedDocument<Xlsx>;

@Schema({
	timestamps: true,
	versionKey: false,
})
export class Xlsx {
	@Prop({ type: String, required: true })
	xlsxUrl: string;

	@Prop({ type: String, required: true })
	cloudinaryId: string;
}

export const XlsxSchema = SchemaFactory.createForClass(Xlsx);
