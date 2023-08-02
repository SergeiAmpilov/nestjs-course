import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from './user.model/user.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { getSalt, hash, genSalt } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>
  ) {
    const a = this.userModel.findOne({});
    // (await this.authModel.findOne().exec())   
    
  }


  async createUser(dto: AuthDto): Promise<UserDocument> {
    const salt = await genSalt(10);
    const passwordHash = await hash(dto.password, salt);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash,
    });
    return newUser.save();

  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
