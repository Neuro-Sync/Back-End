import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './repositories/payment.repository';
import { Payment, PaymentSchema } from './schemas/payment.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }])],
	controllers: [],
	providers: [PaymentRepository, PaymentService],
	exports: [PaymentRepository],
})
export class PaymentModule {}
