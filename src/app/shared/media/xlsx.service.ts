import { Injectable, Logger, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CloudConvertService } from '@shared/cloud-convert/cloud-convert.service';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileType } from '../types';
import { Xlsx, XlsxDocument } from './schemas/xlsx.schema';

@Injectable()
export class XlsxService {
	private logger = new Logger(XlsxService.name);
	constructor(
		@InjectModel(Xlsx.name) private xlsxModel: Model<Xlsx>,
		private cloudinaryService: CloudinaryService,
		private cloudConvertService: CloudConvertService,
	) {}

	private validateXlsx(file: FileType): void {
		this.logger.debug('file', file.mimetype, file.size);
		if (!file.mimetype.includes('vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
			throw new NotAcceptableException('Invalid xlsx file');
		}
		if (file.size > 5e6) {
			throw new NotAcceptableException('Xlsx size is too large');
		}
	}

	async uploadSingleXlsx(file: FileType): Promise<XlsxDocument> {
		this.validateXlsx(file);
		const result = await this.cloudinaryService.uploadFile(file);
		const xlsx: XlsxDocument = await this.xlsxModel.create({
			xlsxUrl: result.secure_url,
			cloudinaryId: result.public_id,
		});
		this.logger.debug('xlsx', xlsx.id);

		return xlsx;
	}

	async deleteXlsx(xlsxId: string): Promise<XlsxDocument> {
		const cloudinaryId = (await this.xlsxModel.findById(xlsxId)).cloudinaryId;
		await this.cloudinaryService.deleteFile(cloudinaryId);
		return await this.xlsxModel.findByIdAndDelete(xlsxId);
	}

	async downloadXlsxTemplate(cloudinayId: string) {
		return await this.cloudConvertService.convertFile(cloudinayId);
	}
}
