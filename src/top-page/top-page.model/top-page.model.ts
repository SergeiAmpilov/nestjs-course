import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Schema as MSchema } from "mongoose";



export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}

@Schema()
export class TopPageAdvantage {

  @Prop({
    type: MSchema.Types.String,
  })
  title: string;

  @Prop({
    type: MSchema.Types.String,
  })
  descriptiuon: string;
}

export const TopPageAdvantageSchema = SchemaFactory.createForClass(TopPageAdvantage);

@Schema()
export class HHSalary {

  @Prop({
    type: MSchema.Types.Number,
  })
  count: number;

  @Prop({
    type: MSchema.Types.Number,
  })
  juniorSalary: number;

  @Prop({
    type: MSchema.Types.Number,
  })
  middleSalary: number;

  @Prop({
    type: MSchema.Types.Number,
  })
  seniorSalary: number;
}

export const HHSalarySchema = SchemaFactory.createForClass(HHSalary);




@Schema({
  timestamps: true,
})
export class TopPageModel extends Document {
  // _id: string;

  @Prop({
    type: MSchema.Types.String,
    enum: TopLevelCategory,
  })
  firstCategory: TopLevelCategory;

  @Prop({
    type: MSchema.Types.String
  })
  secondCategory: string;

  @Prop({
    type: MSchema.Types.String,
    unique: true,
  })
  alias: string;

  @Prop({
    type: MSchema.Types.String
  })
  title: string;

  @Prop({
    type: MSchema.Types.String
  })
  category: string;

  @Prop({
    type: HHSalarySchema
  })
  hh?: HHSalary;


  @Prop({
    type: [TopPageAdvantageSchema],
  })
  advantages: TopPageAdvantage[];

  @Prop({
    type: MSchema.Types.String
  })
  seoText: string;

  @Prop({
    type: MSchema.Types.String
  })
  tagsTitle: string;

  @Prop({
    type: [MSchema.Types.String]
  })
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
export type TopPageDocument = HydratedDocument<TopPageModel>;
