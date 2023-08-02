import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from './user.model/user.model';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>
  ) {
    const a = this.userModel.findOne({});


    // (await this.authModel.findOne().exec())
    
    
  }
}
