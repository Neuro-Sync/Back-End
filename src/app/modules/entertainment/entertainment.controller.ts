import { CompanionDocument } from '@modules/companions/companion/schemas';
import { PatientService } from '@modules/patients/patient/patient.service';
import { PatientDocument } from '@modules/patients/patient/schema/patient.schema';
import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@shared/decorators';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CompanionGuard } from '@shared/guards/companion.guard';
import { MediaType } from '@shared/media/enums';
import { MediaService } from '@shared/media/media.service';
import { FileType } from '@shared/types';
import { EntertainmentService } from './entertainment.service';

@Controller('entertainments')
@ApiTags('Entertainment')
@UseGuards(AuthGuard)
export class EntertainmentController {
	private logger = new Logger(EntertainmentController.name);
	constructor(
		private readonly entertainService: EntertainmentService,
		private readonly patientService: PatientService,
		private readonly mediaService: MediaService,
	) {}

	@Get()
	@ApiOperation({ summary: 'get all entertainments' })
	async getEntertainments(
		@CurrentUser() user: CompanionDocument | PatientDocument,
	): Promise<unknown> {
		switch (user.role) {
			case 'companion':
				return await this.entertainService.getDirectModel().find({ sender: user.id });
			case 'patient':
				return await this.entertainService.getDirectModel().find({ receiver: user.id });
		}
	}

	@Get('/:mediaId')
	@ApiOperation({ summary: 'get all entertainments' })
	async getEntertainment(
		@Param('mediaId') mediaId: string,
		@CurrentUser() user: CompanionDocument | PatientDocument,
	): Promise<unknown> {
		switch (user.role) {
			case 'companion':
				return await this.entertainService
					.getDirectModel()
					.find({ media: mediaId, sender: user.id });
			case 'patient':
				return await this.entertainService
					.getDirectModel()
					.find({ media: mediaId, receiver: user.id });
		}
	}

	@Post('companion/raw')
	@UseGuards(CompanionGuard)
	@UseInterceptors(FileInterceptor('file'))
	@ApiOperation({ summary: 'upload entertainment media' })
	async uploadMediaRaw(
		@CurrentUser() user: CompanionDocument,
		@UploadedFile() file: FileType,
	): Promise<unknown> {
		this.logger.debug(`updateMainImage file:${JSON.stringify(file.mimetype)}`);
		const media = await this.mediaService.uploadMedia(file);
		const companionPatient = await this.patientService.findPatient({ companion: user.id });
		this.logger.debug(`companionPatient:${JSON.stringify(companionPatient)}`);
		return {
			message: 'success',
			data: await this.entertainService.getDirectModel().create({
				media: media.id,
				sender: user.id,
				receiver: companionPatient.id,
				received: false,
			}),
		};
	}

	@Post('companion/link')
	@UseGuards(CompanionGuard)
	@ApiOperation({ summary: 'upload entertainment media' })
	async uploadMedia(
		@CurrentUser() user: CompanionDocument,
		@Body() body: { link: string; mediaType: MediaType },
	): Promise<unknown> {
		const media = await this.mediaService.LinkedMedia(body.link, body.mediaType);
		const companionPatient = await this.patientService.findPatient({ companion: user.id });
		this.logger.debug(`companionPatient:${JSON.stringify(companionPatient)}`);
		return {
			message: 'success',
			data: await this.entertainService.getDirectModel().create({
				media: media.id,
				sender: user.id,
				receiver: companionPatient.id,
				received: false,
			}),
		};
	}

	@Delete(':entertainmentId')
	@UseGuards(CompanionGuard)
	@ApiOperation({ summary: 'delete entertainment' })
	async deleteEntertainment(
		@Param('entertainmentId') entertainmentId: string,
		@CurrentUser() user: CompanionDocument,
	): Promise<unknown> {
		const content = await this.entertainService
			.getDirectModel()
			.findOne({ _id: entertainmentId, sender: user.id });
		await this.mediaService.deleteMedia(content.media);
		return {
			message: 'content deleted successfully',
		};
	}
}
