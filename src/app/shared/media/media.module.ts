import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from './image.service';
import { Image, ImageSchema } from './schemas/image.schema';
import { Pdf, PdfSchema } from './schemas/pdf.schema';
import { Xlsx, XlsxSchema } from './schemas/xlsx.schema';
import { XlsxService } from './xlsx.service';

@Global()
@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Pdf.name, schema: PdfSchema },
			{ name: Image.name, schema: ImageSchema },
			{ name: Xlsx.name, schema: XlsxSchema },
		]),
	],
	providers: [ImageService, XlsxService],
	exports: [ImageService, XlsxService],
})
export class ImageModule {}
