import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OptionsObjectDto } from '@shared/options-object/dtos';
import { OptionsObject } from '@shared/options-object/optionsObject';
import { Model } from 'mongoose';
import { PatientDocument } from '../patient/schema/patient.schema';
import { CreateContactDto } from './dtos';
import { Contact, ContactDocument } from './schemas/contact.schema';

//REFACTOR! this cruds must be in a repo class and not in the service
//REFACTOR! this must be a generic service class which consumes the repo class
@Injectable()
export class ContactService {
	private logger = new Logger(ContactService.name);
	constructor(@InjectModel(Contact.name) private ContactModel: Model<Contact>) {}

	async getContacts(optionObjectDto: OptionsObjectDto): Promise<Array<ContactDocument>> {
		return await new OptionsObject<Contact>(this.ContactModel).getResult(optionObjectDto);
	}

	async getContactsQuery(query: unknown): Promise<Array<ContactDocument>> {
		return await this.ContactModel.find(query);
	}

	async getContact(ContactId: string): Promise<ContactDocument> {
		const Contact = await this.ContactModel.findById(ContactId);
		if (!Contact) {
			throw new NotFoundException('Contact not found');
		}

		return Contact;
	}

	async createContact(
		patient: PatientDocument,
		createContactDto: CreateContactDto,
	): Promise<ContactDocument> {
		const Contact = await this.ContactModel.findOne({
			patient,
			$or: [{ name: createContactDto.name }, { phone: createContactDto.phone }],
		});
		if (Contact) {
			throw new ConflictException('Contact already exists');
		}
		return await this.ContactModel.create({
			...createContactDto,
			patient,
		});
	}

	async updateContact(
		ContactId: string,
		Contact: Partial<ContactDocument>,
	): Promise<ContactDocument> {
		return await this.ContactModel.findByIdAndUpdate(ContactId, Contact, { new: true });
	}

	async deleteContact(ContactId: string): Promise<ContactDocument> {
		return await this.ContactModel.findByIdAndDelete(ContactId);
	}
}
