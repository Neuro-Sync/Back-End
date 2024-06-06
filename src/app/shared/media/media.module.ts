import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentService } from './document.service';
import { ImageService } from './image.service';
import { MediaService } from './media.service';
import { Video, VideoSchema } from './schemas/Video.schema';
import { Image, ImageSchema } from './schemas/image.schema';
import { Media, MediaSchema } from './schemas/media.schema';
import { Pdf, PdfSchema } from './schemas/pdf.schema';
import { VideoService } from './video.service';

@Global()
@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Video.name, schema: VideoSchema },
			{ name: Pdf.name, schema: PdfSchema },
			{ name: Image.name, schema: ImageSchema },
			{ name: Media.name, schema: MediaSchema },
		]),
	],
	providers: [MediaService, ImageService, VideoService, DocumentService],
	exports: [MediaService, ImageService],
})
export class MediaModule {}
