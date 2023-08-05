import { Injectable } from '@nestjs/common';
import { TopPageDocument, TopPageModel } from './top-page.model/top-page.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TopPageService {


	constructor(
		@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageDocument>,
	) {}


	async create(dto: TopPageModel) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}


}
