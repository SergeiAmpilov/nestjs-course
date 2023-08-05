import { Injectable } from '@nestjs/common';
import { TopLevelCategory, TopPageDocument, TopPageModel } from './top-page.model/top-page.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {


	constructor(
		@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageDocument>,
	) {}


	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async delete(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async update(id: string, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findByFilter(firstCategory: TopLevelCategory) {
		return this.topPageModel.find({ firstCategory }).exec();
	}


}
