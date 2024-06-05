import { CompanionDocument } from '@modules/companions/companion/schemas';
import { PatientDocument } from '@modules/patients/patient/schema/patient.schema';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OptionsObjectDto } from '@shared/options-object/dtos';
import { OptionsObject } from '@shared/options-object/optionsObject';
import { Model } from 'mongoose';
import { CreateGeoAddressDto } from './dtos';
import { AddressType } from './enums';
import { Address, AddressDocument } from './schemas/address.schema';

@Injectable()
export class AddressService {
	private logger = new Logger(AddressService.name);
	constructor(@InjectModel(Address.name) private addressModel: Model<Address>) {}

	async getAddresses(
		optionsObjectDto: OptionsObjectDto,
		user: PatientDocument,
	): Promise<AddressDocument[]> {
		optionsObjectDto.filter.concat(`,owner=${user.id}`);
		const addresses = await new OptionsObject<Address>(this.addressModel).getResult(
			optionsObjectDto,
		);

		if (addresses.length === 0) {
			throw new NotFoundException('no addresses');
		}

		return addresses;
	}

	async createGeoAddress(
		createGeoAddressDto: CreateGeoAddressDto,
		userId: string,
	): Promise<AddressDocument> {
		const { latitude, longitude, addressType } = createGeoAddressDto;
		return this.addressModel.create({
			latitude,
			longitude,
			addressType: addressType ?? AddressType.OTHER,
			owner: userId,
		});
	}

	async updateCurrentGeoAddress(
		createGeoAddressDto: CreateGeoAddressDto,
		userId: string,
	): Promise<AddressDocument> {
		const { latitude, longitude } = createGeoAddressDto;
		return (
			(await this.addressModel.findOneAndUpdate(
				{ addressType: AddressType.CURRENT, owner: userId },
				{
					latitude,
					longitude,
				},
				{ new: true },
			)) ??
			(await this.addressModel.create({
				latitude,
				longitude,
				addressType: AddressType.CURRENT,
				owner: userId,
			}))
		);
	}

	async getPatientCurrentLocation(companion: CompanionDocument): Promise<AddressDocument> {
		return await this.addressModel.findOne({
			addressType: AddressType.CURRENT,
			owner: companion.patient.id,
		});
	}

	async getAddress(addressId: string, userId: string): Promise<AddressDocument> {
		const address = this.addressModel.findOne({ _id: addressId, owner: userId });

		if (!address) {
			throw new NotFoundException('address not found');
		}

		return address;
	}

	async updateAddress(
		addressId: string,
		address: Partial<AddressDocument>,
	): Promise<AddressDocument> {
		return this.addressModel.findByIdAndUpdate(addressId, address, {
			new: true,
		});
	}

	async deleteAddress(addressId: string, userId: string): Promise<AddressDocument> {
		const address = await this.addressModel.findOneAndDelete({ _id: addressId, owner: userId });

		if (!address) {
			throw new NotFoundException('address not found');
		}

		return address;
	}
}
