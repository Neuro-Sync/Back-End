import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileType } from '../types';
import { Image, ImageDocument } from './schemas/image.schema';
import { Pdf, PdfDocument } from './schemas/pdf.schema';

@Injectable()
export class ImageService {
	private logger = new Logger(ImageService.name);
	constructor(
		@InjectModel(Image.name) private imageModel: Model<Image>,
		@InjectModel(Pdf.name) private pdfModel: Model<Pdf>,
		private cloudinaryService: CloudinaryService,
	) {}

	// 	private validateImage(file: FileType): void {
	// 		if (!file.mimetype.startsWith('image/')) {
	// 			throw new NotAcceptableException('Invalid file type');
	// 		}

	// 		if (file.size > 5e6) {
	// 			throw new NotAcceptableException('Image size is too large');
	// 		}
	// 	}

	async uploadSinglePdf(file: FileType): Promise<PdfDocument> {
		const result = await this.cloudinaryService.uploadFile(file);
		const pdf: PdfDocument = await this.pdfModel.create({
			pdfUrl: result.secure_url,
			cloudinaryId: result.public_id,
		});
		this.logger.debug('pdf', pdf.id);

		return pdf;
	}

	//TODO: make a preview for the image not just upload it
	async uploadSingleImage(file: FileType): Promise<ImageDocument> {
		const result = await this.cloudinaryService.uploadFile(file);
		const image: ImageDocument = await this.imageModel.create({
			imageUrl: result.secure_url,
			mime: file.mimetype,
			previewUrl: result.secure_url,
			cloudinaryId: result.public_id,
		});
		this.logger.debug('image', image.id);

		return image;
	}

	async deleteImage(imageId: string): Promise<ImageDocument> {
		const cloudinaryId = (await this.imageModel.findById(imageId)).cloudinaryId;
		// FIXME the following code delete uploaded images (florist work) from cloudinary
		await this.cloudinaryService.deleteFile(cloudinaryId);
		return await this.imageModel.findByIdAndDelete(imageId);
	}

	async getImagesById(imageId: string): Promise<ImageDocument> {
		return await this.imageModel.findById(imageId);
	}
}
