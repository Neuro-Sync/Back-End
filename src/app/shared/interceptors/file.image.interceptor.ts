import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	PayloadTooLargeException,
	UnprocessableEntityException,
	UnsupportedMediaTypeException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Observable } from 'rxjs';
import { ENUM_FILE_IMAGE_MIME, ENUM_FILE_STATUS_CODE_ERROR } from '../media/enums/file.enum';

@Injectable()
export class FileImageInterceptor implements NestInterceptor {
	constructor() {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<Promise<any> | string>> {
		const ctx: HttpArgumentsHost = context.switchToHttp();
		const { file, files } = ctx.getRequest();
		const finalFiles = files || file;

		if (Array.isArray(finalFiles)) {
			const maxFiles = parseInt(process.env.maxFiles) || 5;

			if (finalFiles.length > maxFiles)
				throw new UnprocessableEntityException({
					statusCode: ENUM_FILE_STATUS_CODE_ERROR.FILE_MAX_ERROR,
					message: 'Max number of files exceeded',
				});

			for (const file of finalFiles) await this.validate(file);
		} else if (typeof finalFiles === 'object') {
			Object.keys(finalFiles).forEach(async (key) => {
				finalFiles[key].forEach(async (file: Express.Multer.File) => {
					await this.validate(file);
				});
			});
		} else {
			await this.validate(finalFiles);
		}

		return next.handle();
	}

	async validate(file: Express.Multer.File): Promise<void> {
		if (!file) {
			throw new UnprocessableEntityException({
				statusCode: ENUM_FILE_STATUS_CODE_ERROR.FILE_NEEDED_ERROR,
				message: 'File is required',
			});
		}
		const { size, mimetype } = file;
		const maxSize = parseInt(process.env.maxSize) || 5e6;

		if (!Object.values(ENUM_FILE_IMAGE_MIME).find((val) => val === mimetype.toLowerCase())) {
			throw new UnsupportedMediaTypeException({
				statusCode: ENUM_FILE_STATUS_CODE_ERROR.FILE_EXTENSION_ERROR,
				message: 'Unsupported file type. Please upload an image file.',
			});
		} else if (size > maxSize) {
			throw new PayloadTooLargeException({
				statusCode: ENUM_FILE_STATUS_CODE_ERROR.FILE_MAX_SIZE_ERROR,
				message: 'File size too large. Max file size is 5MB.',
			});
		}
	}
}
