import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, AuthModel } from './auth.model/auth.model';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel.name) private readonly authModel: Model<AuthDocument>
  ) {
    
  }
}
