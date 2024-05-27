import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address, AddressSchema } from './schemas/address.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }])],
	controllers: [AddressController],
	providers: [AddressService],
	exports: [AddressService],
})
export class AddressModule {}
