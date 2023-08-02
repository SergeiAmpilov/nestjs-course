import { Injectable, UnauthorizedException,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from './user.model/user.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import {  hash, genSalt, compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
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

  async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {

    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    } 
    
    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return { email: user.email };    

  }


  async login(email: string): Promise<{ access_token: string }> {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    }

  }
}
