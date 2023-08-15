import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class UserModel extends Document {
  @Prop({
    required: true,
    type: MSchema.Types.String,
    unique: true,
  })
  email: string;

  @Prop({ type: MSchema.Types.String })
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
export type UserDocument = HydratedDocument<UserModel>;
