import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@shared/decorators';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CompanionDocument } from './schemas';

@Controller('companions')
@UseGuards(AuthGuard)
export class CompanionController {
	constructor() {}

	@Get('me')
	async getCompanion(@CurrentUser() companion: CompanionDocument): Promise<unknown> {
		return {
			message: 'Companion found!',
			data: companion,
		};
	}
}
