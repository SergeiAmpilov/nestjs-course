import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { TopLevelCategory } from '../top-page.model/top-page.model';
import { Type } from 'class-transformer';

export class HHSalaryDto {

	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

export class TopPageAdvantageDto {

	@IsString()
	title: string;

	@IsString()
	descriptiuon: string;
}

export class CreateTopPageDto {

	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;


	@ValidateNested()
	@Type(() => HHSalaryDto)
	hh?: HHSalaryDto;



	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantageDto)
	advantages: TopPageAdvantageDto[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;


	@IsArray()
	@IsString({
		each: true
	})
	tags: string[];
}



