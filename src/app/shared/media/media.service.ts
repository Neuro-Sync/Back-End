import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileType } from '@shared/types';
import { Model } from 'mongoose';
import { DocumentService } from './document.service';
import { MediaType } from './enums';
import { ImageService } from './image.service';
import { ImageDocument, Media, MediaDocument, PdfDocument, VideoDocument } from './schemas';
import { VideoService } from './video.service';

@Injectable()
export class MediaService {
	constructor(
		@InjectModel(Media.name) private readonly mediaModel: Model<Media>,
		private readonly imageService: ImageService,
		private readonly videoService: VideoService,
		private readonly documentService: DocumentService,
	) {}

	async LinkedMedia(link: string, type: MediaType): Promise<MediaDocument> {
		let media: VideoDocument | ImageDocument | PdfDocument;
		switch (type) {
			case MediaType.IMAGE:
				media = await this.imageService.createImage({
					imageUrl: link,
					mime: undefined,
					previewUrl: link,
					cloudinaryId: link,
				});
				return await this.mediaModel.create({ contentType: MediaType.IMAGE, contentId: media.id });
			case MediaType.VIDEO:
				media = await this.videoService.createVideo({
					videoUrl: link,
					previewUrl: link,
					mime: undefined,
					cloudinaryId: null,
				});
				return await this.mediaModel.create({ contentType: MediaType.VIDEO, contentId: media.id });
			case MediaType.PDF:
				media = await this.documentService.createDocument({
					pdfUrl: link,
					cloudinaryId: null,
				});
				return await this.mediaModel.create({
					contentType: MediaType.PDF,
					contentId: media.id,
				});
		}

		throw new Error('Invalid file type');
	}

	async uploadMedia(file: FileType): Promise<MediaDocument> {
		if (file.mimetype.startsWith('image/')) {
			const image = await this.imageService.uploadSingleImage(file);
			return await this.mediaModel.create({ contentType: MediaType.IMAGE, contentId: image.id });
		}

		if (file.mimetype.startsWith('video/')) {
			const video = await this.videoService.uploadSingleVideo(file);
			return await this.mediaModel.create({ contentType: MediaType.VIDEO, contentId: video.id });
		}

		if (file.mimetype.includes('pdf')) {
			const document = await this.documentService.uploadSingleDocument(file);
			return await this.mediaModel.create({
				contentType: MediaType.PDF,
				contentId: document.id,
			});
		}

		throw new Error('Invalid file type');
	}

	async deleteMedia(media: MediaDocument): Promise<MediaDocument> {
		try {
			switch (media.contentType) {
				case MediaType.IMAGE:
					await this.imageService.deleteImage(media.contentId as ImageDocument);
					break;
				case MediaType.VIDEO:
					await this.videoService.deleteVideo(media.contentId as VideoDocument);
					break;
				case MediaType.PDF:
					await this.documentService.deleteDocument(media.contentId as PdfDocument);
					break;
			}
		} catch (err) {
			throw new InternalServerErrorException('error while deleting media');
		} finally {
			await this.mediaModel.findByIdAndDelete(media.id);
		}
		return media;
	}
}
