import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from './image.service';
import { Image, ImageSchema } from './schemas/image.schema';
import { Pdf, PdfSchema } from './schemas/pdf.schema';

@Global()
@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Pdf.name, schema: PdfSchema },
			{ name: Image.name, schema: ImageSchema },
		]),
	],
	providers: [ImageService],
	exports: [ImageService],
})
export class ImageModule {}
