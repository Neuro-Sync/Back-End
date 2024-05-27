import { Controller, Logger, Patch } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDocument } from './schemas/payment.schema';

@Controller('payments')
export class PaymentController {
	private logger = new Logger(PaymentController.name);
	constructor(private paymentService: PaymentService) {}

	@Patch('/:paymentId/confirm')
	async confirmPayment(paymentId: string): Promise<PaymentDocument> {
		this.logger.debug(`Confirming payment with id: ${paymentId}`);
		return await this.paymentService.confirmPayment(paymentId);
	}
}
