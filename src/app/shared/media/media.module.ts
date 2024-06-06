import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentService } from './document.service';
import { ImageService } from './image.service';
import { MediaService } from './media.service';
import { ImageSchema, Media, MediaSchema, Pdf, PdfSchema, Video, VideoSchema } from './schemas';
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
