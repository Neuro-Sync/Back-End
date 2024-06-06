import { CompanionDocument } from '@modules/companions/companion/schemas';
import { PatientDocument } from '@modules/patients/patient/schema/patient.schema';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OptionsObjectDto } from '@shared/options-object/dtos';
import { OptionsObject } from '@shared/options-object/optionsObject';
import { Model } from 'mongoose';
import { CreateGeoMapDto } from './dtos';
import { MapType } from './enums';
import { Map, MapDocument } from './schemas/map.schema';

@Injectable()
export class MapService {
	private logger = new Logger(MapService.name);
	constructor(@InjectModel(Map.name) private mapModel: Model<Map>) {}

	async getMapes(
		optionsObjectDto: OptionsObjectDto,
		user: PatientDocument,
	): Promise<MapDocument[]> {
		optionsObjectDto.filter.concat(`,owner=${user.id}`);
		const maps = await new OptionsObject<Map>(this.mapModel).getResult(optionsObjectDto);

		if (maps.length === 0) {
			throw new NotFoundException('no maps');
		}

		return maps;
	}

	async createGeoMap(createGeoMapDto: CreateGeoMapDto, userId: string): Promise<MapDocument> {
		const { latitude, longitude, mapType } = createGeoMapDto;
		return this.mapModel.create({
			latitude,
			longitude,
			mapType: mapType ?? MapType.OTHER,
			owner: userId,
		});
	}

	async updateCurrentGeoMap(
		createGeoMapDto: CreateGeoMapDto,
		userId: string,
	): Promise<MapDocument> {
		const { latitude, longitude } = createGeoMapDto;
		return (
			(await this.mapModel.findOneAndUpdate(
				{ mapType: MapType.CURRENT, owner: userId },
				{
					latitude,
					longitude,
				},
				{ new: true },
			)) ??
			(await this.mapModel.create({
				latitude,
				longitude,
				mapType: MapType.CURRENT,
				owner: userId,
			}))
		);
	}

	async getPatientCurrentLocation(companion: CompanionDocument): Promise<MapDocument> {
		return await this.mapModel.findOne({
			mapType: MapType.CURRENT,
			owner: companion.patient.id,
		});
	}

	async getMap(mapId: string, userId: string): Promise<MapDocument> {
		const map = this.mapModel.findOne({ _id: mapId, owner: userId });

		if (!map) {
			throw new NotFoundException('map not found');
		}

		return map;
	}

	async updateMap(mapId: string, map: Partial<MapDocument>): Promise<MapDocument> {
		return this.mapModel.findByIdAndUpdate(mapId, map, {
			new: true,
		});
	}

	async deleteMap(mapId: string, userId: string): Promise<MapDocument> {
		const map = await this.mapModel.findOneAndDelete({ _id: mapId, owner: userId });

		if (!map) {
			throw new NotFoundException('map not found');
		}

		return map;
	}
}
