import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Schema as MSchema } from "mongoose";


@Schema({
  timestamps: true,
})
export class AuthModel extends Document {

  @Prop({ 
    required: true,
    type: MSchema.Types.String,
    unique: true,
  })
  email: string;

  @Prop({ type: MSchema.Types.String})
  passwordHash: string;

}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
export type AuthDocument = HydratedDocument<AuthModel>;
