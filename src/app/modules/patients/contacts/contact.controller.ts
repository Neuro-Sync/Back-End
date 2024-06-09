import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@shared/decorators';
import { AdminGuard } from '@shared/guards/admin.guard';
import { AuthGuard } from '@shared/guards/auth.guard';
import { IResponse } from '@shared/interfaces';
import { OptionsObjectDto } from '@shared/options-object/dtos';
import { PatientDocument } from '../patient/schema/patient.schema';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dtos';
import { Contact, ContactDocument } from './schemas/contact.schema';

@Controller('Contacts')
@ApiTags('Contact')
@UseGuards(AuthGuard)
export class ContactController {
	private logger = new Logger(ContactController.name);
	constructor(private ContactService: ContactService) {}

	@Get()
	@ApiOperation({ summary: 'get all Contacts' })
	async getContacts(
		@CurrentUser() patient: PatientDocument,
		@Query() optionsObjectDto: OptionsObjectDto,
	): Promise<IResponse<Array<Contact>>> {
		optionsObjectDto.filter.concat(`patientId ${patient.id}`);
		return {
			message: 'success',
			data: await this.ContactService.getContacts(optionsObjectDto),
		};
	}

	//NOTE: This is will return only one Contact and it's decendancants
	@Get('/:ContactId')
	@ApiOperation({ summary: 'get Contact by id' })
	async getContact(@Param('ContactId') ContactId: string): Promise<IResponse<Contact>> {
		return {
			message: 'success',
			data: await this.ContactService.getContact(ContactId),
		};
	}

	@Post()
	@ApiOperation({ summary: 'create Contact' })
	@UseGuards(AdminGuard)
	async createContact(
		@CurrentUser() patient: PatientDocument,
		@Body() createContactDto: CreateContactDto,
	): Promise<IResponse<Contact>> {
		return {
			message: 'success',
			data: await this.ContactService.createContact(patient, createContactDto),
		};
	}

	@Patch('/:ContactId')
	@ApiOperation({ summary: 'update Contact' })
	@UseGuards(AdminGuard)
	async updateContact(
		@Param('ContactId') ContactId: string,
		@Body() Contact: Partial<ContactDocument>,
	): Promise<IResponse<Contact>> {
		return {
			message: 'success',
			data: await this.ContactService.updateContact(ContactId, Contact),
		};
	}

	@Delete('/:ContactId')
	@ApiOperation({ summary: 'delete Contact' })
	@UseGuards(AdminGuard)
	async deleteContact(@Param('ContactId') ContactId: string): Promise<IResponse<Contact>> {
		return {
			message: 'success',
			data: await this.ContactService.deleteContact(ContactId),
		};
	}
}
