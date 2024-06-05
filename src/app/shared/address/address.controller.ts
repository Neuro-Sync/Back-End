import { CompanionDocument } from '@modules/companions/companion/schemas';
import { PatientDocument } from '@modules/patients/patient/schema/patient.schema';
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
import { CurrentUser } from '@shared/decorators/current-user.decorator';
import { AuthGuard } from '@shared/guards/auth.guard';
import { OptionsObjectDto } from '@shared/options-object/dtos';
import { AddressService } from './address.service';
import { CreateGeoAddressDto } from './dtos';
import { AddressType } from './enums';
import { AddressDocument } from './schemas/address.schema';

@Controller('map')
@ApiTags('maps')
@UseGuards(AuthGuard)
export class AddressController {
	private logger = new Logger(AddressController.name);
	constructor(private addressService: AddressService) {}

	@Post('/patient')
	@ApiOperation({ summary: 'create geo address' })
	async createGeoAddress(
		@CurrentUser() patient: PatientDocument,
		@Body() createGeoAddressDto: CreateGeoAddressDto,
	): Promise<AddressDocument> {
		return await this.addressService.createGeoAddress(createGeoAddressDto, patient.id);
	}
	@Post('/patient/pin')
	@ApiOperation({ summary: 'create geo address' })
	async createPin(
		@CurrentUser() patient: PatientDocument,
		@Body() createGeoAddressDto: CreateGeoAddressDto,
	): Promise<AddressDocument> {
		createGeoAddressDto.addressType = AddressType.PIN;
		return await this.addressService.createGeoAddress(createGeoAddressDto, patient.id);
	}
	@Post('/patient/favorite')
	@ApiOperation({ summary: 'create geo address' })
	async createFavorite(
		@CurrentUser() patient: PatientDocument,
		@Body() createGeoAddressDto: CreateGeoAddressDto,
	): Promise<AddressDocument> {
		createGeoAddressDto.addressType = AddressType.FAVORITE;
		return await this.addressService.createGeoAddress(createGeoAddressDto, patient.id);
	}

	@Patch('/patient/current-location')
	@ApiOperation({ summary: 'create geo address' })
	async createCurrentGeoAddress(
		@CurrentUser() patient: PatientDocument,
		@Body() createGeoAddressDto: CreateGeoAddressDto,
	): Promise<AddressDocument> {
		return await this.addressService.updateCurrentGeoAddress(createGeoAddressDto, patient.id);
	}

	@Get('/companion/patient-current-location')
	@ApiOperation({ summary: "get patient current geos' " })
	async getPatientCurrentLocation(
		@CurrentUser() companion: CompanionDocument,
	): Promise<AddressDocument> {
		return await this.addressService.getPatientCurrentLocation(companion);
	}

	@Get()
	@ApiOperation({ summary: 'get addresses' })
	async getAddresses(
		@CurrentUser() user: PatientDocument,
		@Query() query: OptionsObjectDto,
	): Promise<AddressDocument[]> {
		return await this.addressService.getAddresses(query, user);
	}

	@Get('/:addressId')
	@ApiOperation({ summary: 'get address by id' })
	async getAddress(
		@CurrentUser() user: PatientDocument,
		@Param('addressId') addressId: string,
	): Promise<AddressDocument> {
		this.logger.debug(`addressId:${addressId},userId: ${user.id}`);
		return await this.addressService.getAddress(addressId, user.id);
	}

	@Patch('/:addressId')
	@ApiOperation({ summary: 'update address' })
	async updateAddress(
		@Param('addressId') addressId: string,
		@Body() createGeoAddressDto: CreateGeoAddressDto,
	): Promise<AddressDocument> {
		return await this.addressService.updateAddress(addressId, createGeoAddressDto);
	}

	@Delete('/:addressId')
	@ApiOperation({ summary: 'delete address' })
	async deleteAddress(
		@CurrentUser() user: PatientDocument,
		@Param('addressId') addressId: string,
	): Promise<AddressDocument> {
		return await this.addressService.deleteAddress(addressId, user.id);
	}
}
