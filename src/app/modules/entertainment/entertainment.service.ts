import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entertainment } from './schema/entertainment.schema';

@Injectable()
export class EntertainmentService {
	constructor(@InjectModel(Entertainment.name) private entertainModel: Model<Entertainment>) {}

	getDirectModel(): Model<Entertainment> {
		return this.entertainModel;
	}
}
