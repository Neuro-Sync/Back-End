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
import { CreateAddressDto } from './dtos/create-address.dto';
import { CreateGeoAddressDto } from './dtos/create-geo-address.dto';
import { AddressDocument } from './schemas/address.schema';

@Controller('addresses')
@ApiTags('Address')
@UseGuards(AuthGuard)
export class AddressController {
	private logger = new Logger(AddressController.name);
	constructor(private addressService: AddressService) {}

	@Post()
	@ApiOperation({ summary: 'create address' })
	async createAddress(
		@CurrentUser() user: PatientDocument,
		@Body() createAddressDto: CreateAddressDto,
	): Promise<AddressDocument> {
		return await this.addressService.createAddress(createAddressDto, user.id);
	}

	@Post('geo')
	@ApiOperation({ summary: 'create geo address' })
	async createGeoAddress(
		@CurrentUser() user: PatientDocument,
		@Body() createGeoAddressDto: CreateGeoAddressDto,
	): Promise<AddressDocument> {
		return await this.addressService.createGeoAddress(createGeoAddressDto, user.id);
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
		@Body() createAddressDto: CreateAddressDto,
	): Promise<AddressDocument> {
		return await this.addressService.updateAddress(addressId, createAddressDto);
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
