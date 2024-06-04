import { HydratedDocument } from 'mongoose';

export interface IRepository<T> {
	create(data: T): Promise<HydratedDocument<T>>;
	update(id: string, data: Partial<T>): Promise<HydratedDocument<T>>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<HydratedDocument<T>>;
	findAll(): Promise<HydratedDocument<T>[]>;
	findOne(query: unknown): Promise<HydratedDocument<T>>;
}
