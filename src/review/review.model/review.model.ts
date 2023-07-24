import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Schema as MSchema } from "mongoose";

@Schema({
  timestamps: true,
})
export class ReviewModel extends Document {
  // _id: string;

  @Prop({
    type: MSchema.Types.String,
  })
  name: string;

  @Prop({
    type: MSchema.Types.String,
  })
  title: string;

  @Prop({
    type: MSchema.Types.String,
  })
  description: string;

  @Prop({
    type: MSchema.Types.Number,
  })
  rating: number;

  @Prop({
    type: MSchema.Types.Date,
  })
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
export type ReviewDocument = HydratedDocument<ReviewModel>;