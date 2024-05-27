import { IsOptional, IsString } from 'class-validator';

export class OptionsObjectDto {
	@IsString({
		message: 'Limit must be a string',
	})
	@IsOptional()
	limit?: string;

	@IsString({
		message: 'Page must be a string',
	})
	@IsOptional()
	page?: string;

	@IsString({
		message: 'Sort must be a string starting without prefix for ASC or with - as prefix to DEC',
	})
	@IsOptional()
	sort?: string;

	@IsString({
		message: 'Filter must be a string and each filter must be separated by a comma',
	})
	@IsOptional()
	filter?: string;

	@IsString({
		message: 'Search must be a string',
	})
	@IsOptional()
	select?: string;
}
