import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinay } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CloudinaryResponseType, FileType } from '../../shared/types';

@Injectable()
export class CloudinaryService {
	private logger = new Logger(CloudinaryService.name);
	constructor(private configService: ConfigService) {
		this.logger.verbose('CloudinaryService initialized', this.configService.get('cloudinary.name'));
		cloudinay.config({
			cloud_name: this.configService.get<string>('cloudinary.name'),
			api_key: this.configService.get<string>('cloudinary.api_key'),
			api_secret: this.configService.get<string>('cloudinary.api_secret'),
		});
	}

	async uploadFile(file: FileType): Promise<CloudinaryResponseType> {
		return new Promise<CloudinaryResponseType>((resolve, reject) => {
			const uploadStream = cloudinay.uploader.upload_stream(
				{
					resource_type: 'auto',
				},
				(error, result) => {
					if (error) {
						reject(error);
					}
					resolve(result);
				},
			);

			streamifier.createReadStream(file.buffer).pipe(uploadStream);
		});
	}

	async deleteFile(publicId: string): Promise<CloudinaryResponseType> {
		return new Promise<CloudinaryResponseType>((resolve, reject) => {
			cloudinay.uploader.destroy(publicId, (error, result) => {
				if (error) {
					reject(error);
				}
				resolve(result);
			});
		});
	}

	async downloadFile(publicId: string): Promise<Buffer> {
		return new Promise<Buffer>((resolve, reject) => {
			cloudinay.api.resource(publicId, (error, result) => {
				if (error) {
					reject(error);
				}
				resolve(result);
			});
		});
	}
}
