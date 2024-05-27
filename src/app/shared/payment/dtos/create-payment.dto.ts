import { Payment } from '../schemas/payment.schema';

export class CreatePaymentDto extends Payment {
	paymentMethod: string;
	phone: string;
	user: string;
	amount: number;
	currency: string;
	paidAt?: Date;
	transactionId?: string;
}
