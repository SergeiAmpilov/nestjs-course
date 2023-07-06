import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';
import { Post, PostDocument } from './models/post.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();

    // (await this.postModel.findOne().exec()).author.email;
  }

  async createUser(email: string, password: string) {
    const newUser = new this.userModel({ email, password });
    return await newUser.save();
  }
}
