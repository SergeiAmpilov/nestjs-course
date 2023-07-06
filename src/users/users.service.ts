import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async createUser(email: string, password: string) {
    const newUser = new this.userModel({ email, password });
    return await newUser.save();
  }
}
