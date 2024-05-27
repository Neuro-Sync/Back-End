import { PatientDocument } from '@modules/patients/patient/schema/patient.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OptionsObjectDto } from '@shared/options-object/dtos';
import { OptionsObject } from '@shared/options-object/optionsObject';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dtos/create-address.dto';
import { CreateGeoAddressDto } from './dtos/create-geo-address.dto';
import { AddressType } from './enums';
import { Address, AddressDocument } from './schemas/address.schema';

@Injectable()
export class AddressService {
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
		return this.addressModel.create({
			addressType: AddressType.COORDINATE,
			...createGeoAddressDto,
			owner: userId,
		});
	}

	async createAddress(
		createAddressDto: CreateAddressDto,
		userId: string,
	): Promise<AddressDocument> {
		return this.addressModel.create({
			addressType: AddressType.ADDRESS,
			...createAddressDto,
			owner: userId,
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
