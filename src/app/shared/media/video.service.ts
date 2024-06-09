import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileType } from '../types';
import { Video, VideoDocument } from './schemas';

@Injectable()
export class VideoService {
	private logger = new Logger(VideoService.name);
	constructor(
		@InjectModel(Video.name) private VideoModel: Model<Video>,
		private cloudinaryService: CloudinaryService,
	) {}

	// 	private validateVideo(file: FileType): void {
	// 		if (!file.mimetype.startsWith('Video/')) {
	// 			throw new NotAcceptableException('Invalid file type');
	// 		}

	// 		if (file.size > 5e6) {
	// 			throw new NotAcceptableException('Video size is too large');
	// 		}
	// 	}

	async createVideo(dto: unknown): Promise<VideoDocument> {
		return await this.VideoModel.create(dto);
	}

	//TODO: make a preview for the Video not just upload it
	async uploadSingleVideo(file: FileType): Promise<VideoDocument> {
		const result = await this.cloudinaryService.uploadFile(file);
		const Video: VideoDocument = await this.VideoModel.create({
			VideoUrl: result.secure_url,
			mime: file.mimetype,
			previewUrl: result.secure_url,
			cloudinaryId: result.public_id,
		});
		this.logger.debug('Video', Video.id);

		return Video;
	}

	async deleteVideo(Video: VideoDocument): Promise<VideoDocument> {
		await this.cloudinaryService.deleteFile(Video.cloudinaryId);
		return await this.VideoModel.findByIdAndDelete(Video.id);
	}

	async getVideosById(VideoId: string): Promise<VideoDocument> {
		return await this.VideoModel.findById(VideoId);
	}
}
