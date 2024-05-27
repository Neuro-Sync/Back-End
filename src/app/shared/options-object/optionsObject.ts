import { Logger } from '@nestjs/common';
import { HydratedDocument, Model } from 'mongoose';
import { OptionsObjectDto } from './dtos';
export class OptionsObject<T> {
	private logger = new Logger(OptionsObject.name);
	constructor(private genericModel: Model<T>) {}

	private createFilterObject(filter?: string): object {
		const filterObject = {};
		if (
			((!filter || filter === '' || filter?.includes('undefined'), filter?.includes('null')),
			filter?.includes('NaN') ||
				filter?.includes('Infinity') ||
				filter?.includes('-Infinity') ||
				!filter?.includes('='))
		) {
			return filterObject;
		}

		filter.split(',').map((i) => {
			this.logger.debug(`inside map: i ${i}`);
			const [key, val] = i.split('=');
			if (!val) {
				return filterObject;
			}
			this.logger.debug(`inside map: key ${key} val ${val}`);
			if (
				val.startsWith('gt') ||
				val.startsWith('lt') ||
				val.startsWith('gte') ||
				val.startsWith('lte') ||
				val.startsWith('ne')
			) {
				const [option, value] = val.split(':');
				return (filterObject[key] = { [`$${option}`]: value });
			}
			if (filterObject[key] && !Array.isArray(filterObject[key]['$in'])) {
				this.logger.debug(`filter object creating the new Array ${JSON.stringify(filterObject)}`);
				filterObject[key] = { ['$in']: [filterObject[key], val] };
				this.logger.debug(`filter object creating the new Array ${JSON.stringify(filterObject)}`);
				return filterObject;
			} else if (filterObject[key] && Array.isArray(filterObject[key]['$in'])) {
				this.logger.debug(
					`filter object appending to the existing array ${JSON.stringify(filterObject)}`,
				);
				filterObject[key] = { ['$in']: [...filterObject[key]['$in'], val] };
				this.logger.debug(
					`filter object appending to the existing array ${JSON.stringify(filterObject)}`,
				);
				return filterObject;
			}
			this.logger.debug(`filter object ${JSON.stringify(filterObject)}`);
			return (filterObject[key] = val);
		});

		this.logger.debug(`filter object ${JSON.stringify(filterObject)}`);

		return filterObject;
	}

	//TODO: Add userId to the function to filter the data based on the user
	//NOTE: such an approach will require to standardize the name of userId field in all the schemas
	//NOTE: it's advised not to couple the service with the user schema and to keep it generic
	async getResult(optionsObjectDto: OptionsObjectDto): Promise<HydratedDocument<T>[]> {
		const optionsObject = { ...optionsObjectDto };

		const filterObject = this.createFilterObject(optionsObject.filter);

		this.logger.debug('filterObject', filterObject);

		const result = this.genericModel.find(filterObject);

		if (optionsObject.select) {
			result.select(optionsObject.select.split(',').join(' '));
		}

		const page = Number(optionsObject.page) || 1;
		const limit = Number(optionsObject.limit) || 100;

		const skip = (page - 1) * limit;

		result.skip(skip).limit(limit);

		if (optionsObject.sort) {
			result.sort(optionsObject.sort.split(',').join(' '));
		}

		return await result;
	}
}
