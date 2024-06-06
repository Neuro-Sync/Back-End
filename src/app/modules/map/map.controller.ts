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
import { CreateGeoMapDto } from './dtos';
import { MapType } from './enums';
import { MapService } from './map.service';
import { MapDocument } from './schemas/map.schema';

@Controller('map')
@ApiTags('maps')
@UseGuards(AuthGuard)
export class MapController {
	private logger = new Logger(MapController.name);
	constructor(private mapService: MapService) {}

	@Post('/patient')
	@ApiOperation({ summary: 'create geo map' })
	async createGeoMap(
		@CurrentUser() patient: PatientDocument,
		@Body() createGeoMapDto: CreateGeoMapDto,
	): Promise<MapDocument> {
		return await this.mapService.createGeoMap(createGeoMapDto, patient.id);
	}
	@Post('/patient/pin')
	@ApiOperation({ summary: 'create geo map' })
	async createPin(
		@CurrentUser() patient: PatientDocument,
		@Body() createGeoMapDto: CreateGeoMapDto,
	): Promise<MapDocument> {
		createGeoMapDto.mapType = MapType.PIN;
		return await this.mapService.createGeoMap(createGeoMapDto, patient.id);
	}
	@Post('/patient/favorite')
	@ApiOperation({ summary: 'create geo map' })
	async createFavorite(
		@CurrentUser() patient: PatientDocument,
		@Body() createGeoMapDto: CreateGeoMapDto,
	): Promise<MapDocument> {
		createGeoMapDto.mapType = MapType.FAVORITE;
		return await this.mapService.createGeoMap(createGeoMapDto, patient.id);
	}

	@Patch('/patient/current-location')
	@ApiOperation({ summary: 'create geo map' })
	async createCurrentGeoMap(
		@CurrentUser() patient: PatientDocument,
		@Body() createGeoMapDto: CreateGeoMapDto,
	): Promise<MapDocument> {
		return await this.mapService.updateCurrentGeoMap(createGeoMapDto, patient.id);
	}

	@Get('/companion/patient-current-location')
	@ApiOperation({ summary: "get patient current geos' " })
	async getPatientCurrentLocation(
		@CurrentUser() companion: CompanionDocument,
	): Promise<MapDocument> {
		return await this.mapService.getPatientCurrentLocation(companion);
	}

	@Get()
	@ApiOperation({ summary: 'get mapes' })
	async getMapes(
		@CurrentUser() user: PatientDocument,
		@Query() query: OptionsObjectDto,
	): Promise<MapDocument[]> {
		return await this.mapService.getMapes(query, user);
	}

	@Get('/:mapId')
	@ApiOperation({ summary: 'get map by id' })
	async getMap(
		@CurrentUser() user: PatientDocument,
		@Param('mapId') mapId: string,
	): Promise<MapDocument> {
		this.logger.debug(`mapId:${mapId},userId: ${user.id}`);
		return await this.mapService.getMap(mapId, user.id);
	}

	@Patch('/:mapId')
	@ApiOperation({ summary: 'update map' })
	async updateMap(
		@Param('mapId') mapId: string,
		@Body() createGeoMapDto: CreateGeoMapDto,
	): Promise<MapDocument> {
		return await this.mapService.updateMap(mapId, createGeoMapDto);
	}

	@Delete('/:mapId')
	@ApiOperation({ summary: 'delete map' })
	async deleteMap(
		@CurrentUser() user: PatientDocument,
		@Param('mapId') mapId: string,
	): Promise<MapDocument> {
		return await this.mapService.deleteMap(mapId, user.id);
	}
}
