import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ENUM_FILE_TYPE } from '@shared/media/enums';
import { FileImageInterceptor } from '../interceptors/file.image.interceptor';
import { FilePDFInterceptor } from '../interceptors/file.pdf.interceptor';

export function UploadFileSingle(field: string, type: ENUM_FILE_TYPE): any {
	switch (type) {
		case ENUM_FILE_TYPE.IMAGE:
			return applyDecorators(UseInterceptors(FileInterceptor(field), FileImageInterceptor));
		case ENUM_FILE_TYPE.PDF:
			return applyDecorators(UseInterceptors(FileInterceptor(field), FilePDFInterceptor));
		default:
			return applyDecorators(UseInterceptors(FileInterceptor(field)));
	}
}

export function UploadFileMultiple(
	fields: { name: string; maxCount: number }[],
	type: ENUM_FILE_TYPE,
): any {
	switch (type) {
		case ENUM_FILE_TYPE.IMAGE:
			return applyDecorators(UseInterceptors(FileFieldsInterceptor(fields), FileImageInterceptor));
		case ENUM_FILE_TYPE.PDF:
			return applyDecorators(UseInterceptors(FileFieldsInterceptor(fields), FilePDFInterceptor));
		default:
			return applyDecorators(UseInterceptors(FileFieldsInterceptor(fields)));
	}
}
