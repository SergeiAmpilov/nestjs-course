import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


@Schema()
export class AuthModel {

  @Prop({ required: true })
  email: string;

  @Prop()
  passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
export type AuthDocument = HydratedDocument<AuthModel>;

