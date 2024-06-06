import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileType } from '../types';
import { Pdf, PdfDocument } from './schemas/pdf.schema';

@Injectable()
export class DocumentService {
	private logger = new Logger(DocumentService.name);
	constructor(
		@InjectModel(Pdf.name) private pdfModel: Model<Pdf>,
		private cloudinaryService: CloudinaryService,
	) {}

	// 	private validateDocument(file: FileType): void {
	// 		if (!file.mimetype.startsWith('pdf/')) {
	// 			throw new NotAcceptableException('Invalid file type');
	// 		}

	// 		if (file.size > 5e6) {
	// 			throw new NotAcceptableException('Pdf size is too large');
	// 		}
	// 	}

	async createDocument(dto: unknown): Promise<PdfDocument> {
		return await this.pdfModel.create(dto);
	}

	//TODO: make a preview for the pdf not just upload it
	async uploadSingleDocument(file: FileType): Promise<PdfDocument> {
		const result = await this.cloudinaryService.uploadFile(file);
		const pdf: PdfDocument = await this.pdfModel.create({
			pdfUrl: result.secure_url,
			cloudinaryId: result.public_id,
		});
		this.logger.debug('pdf', pdf.id);

		return pdf;
	}

	async deleteDocument(document: PdfDocument): Promise<PdfDocument> {
		await this.cloudinaryService.deleteFile(document.cloudinaryId);
		return await this.pdfModel.findByIdAndDelete(document.id);
	}

	async getDocumentsById(DocumentId: string): Promise<PdfDocument> {
		return await this.pdfModel.findById(DocumentId);
	}
}
