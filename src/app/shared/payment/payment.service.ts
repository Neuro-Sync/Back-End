import { Injectable } from '@nestjs/common';
import { PaymentStatus } from './enums';
import { PaymentRepository } from './repositories';
import { PaymentDocument } from './schemas/payment.schema';

@Injectable()
export class PaymentService {
	constructor(private paymentRepository: PaymentRepository) {}

	// async getPayments() {
	// 	return await this.paymentRepository.find();
	// }

	// async getPayment(paymentId: string) {
	// 	return await this.paymentRepository.findById(paymentId);
	// }

	async confirmPayment(paymentId: string): Promise<PaymentDocument> {
		return await this.paymentRepository.update(paymentId, { status: PaymentStatus.SUCCESS });
	}

	// async refundPayment(paymentId: string) {}

	// async cancelPayment(paymentId: string) {}
}
