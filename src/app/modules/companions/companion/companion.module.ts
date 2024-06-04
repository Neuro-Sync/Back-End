import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanionController } from './companion.controller';
import { CompanionService } from './companion.service';
import { CompanionRepository } from './repositories';
import { Companion, CompanionSchema } from './schemas';

@Module({
	imports: [MongooseModule.forFeature([{ name: Companion.name, schema: CompanionSchema }])],
	controllers: [CompanionController],
	providers: [CompanionService, CompanionRepository],
	exports: [CompanionService, CompanionRepository],
})
export class CompanionModule {}
