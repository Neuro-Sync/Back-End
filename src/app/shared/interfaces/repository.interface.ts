export interface IRepository<T> {
	create(data: T): Promise<T>;
	update(id: string, data: Partial<T>): Promise<T>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<T>;
	findAll(): Promise<T[]>;
	findOne(query: any): Promise<T>;
}
