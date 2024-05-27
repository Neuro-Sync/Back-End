import { CustomerDocument } from '../../modules/customers/customer/schemas/customer.schema';

export type currentUser = CustomerDocument & { session: string };
