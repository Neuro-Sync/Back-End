import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IRepository } from '@shared/interfaces';
import { Model } from 'mongoose';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { Payment, PaymentDocument } from '../schemas/payment.schema';

@Injectable()
export class PaymentRepository implements IRepository<Payment> {
	constructor(@InjectModel(Payment.name) private paymentModel: Model<Payment>) {}

	async create(payment: CreatePaymentDto): Promise<PaymentDocument> {
		const paymentData = { ...CreatePaymentDto, status: 'pending' };
		return await this.paymentModel.create({ ...paymentData });
	}

	async findById(paymentId: string): Promise<Payment> {
		return this.paymentModel.findById(paymentId).exec();
	}

	async findOne(query: any): Promise<PaymentDocument> {
		return this.paymentModel.findOne(query).exec();
	}

	async findAll(): Promise<PaymentDocument[]> {
		return this.paymentModel.find().exec();
	}

	async update(paymentId: string, payment: Partial<PaymentDocument>): Promise<PaymentDocument> {
		return this.paymentModel.findByIdAndUpdate(paymentId, payment, { new: true }).exec();
	}

	async delete(paymentId: string): Promise<void> {
		this.paymentModel.findByIdAndDelete(paymentId).exec();
	}
}
