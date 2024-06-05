import { Injectable } from '@nestjs/common';
import { CompanionRepository } from './repositories';

@Injectable()
export class CompanionService {
	constructor(private readonly companionRepository: CompanionRepository) {}
}
