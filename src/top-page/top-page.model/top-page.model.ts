import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Schema as MSchema } from "mongoose";
import { IsArray, IsEnum, IsNumber, IsString, ValidateNested,  } from 'class-validator';
import { Type } from 'class-transformer';



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
  @IsString()
  title: string;

  @Prop({
    type: MSchema.Types.String,
  })
  @IsString()
  descriptiuon: string;
}

export const TopPageAdvantageSchema = SchemaFactory.createForClass(TopPageAdvantage);

@Schema()
export class HHSalary {

  @Prop({
    type: MSchema.Types.Number,
  })
  @IsNumber()
  count: number;

  @Prop({
    type: MSchema.Types.Number,
  })
  @IsNumber()
  juniorSalary: number;

  @Prop({
    type: MSchema.Types.Number,
  })
  @IsNumber()
  middleSalary: number;

  @Prop({
    type: MSchema.Types.Number,
  })
  @IsNumber()
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
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @Prop({
    type: MSchema.Types.String
  })
  @IsString()
  secondCategory: string;

  @Prop({
    type: MSchema.Types.String,
    unique: true,
  })
  @IsString()
  alias: string;

  @Prop({
    type: MSchema.Types.String
  })
  @IsString()
  title: string;

  @Prop({
    type: MSchema.Types.String
  })
  @IsString()
  category: string;

  @Prop({
    type: HHSalarySchema
  })
  @ValidateNested()
  @Type(() => HHSalary)
  hh?: HHSalary;


  @Prop({
    type: [TopPageAdvantageSchema],
  })
  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantage)
  advantages: TopPageAdvantage[];

  @Prop({
    type: MSchema.Types.String
  })
  @IsString()
  seoText: string;

  @Prop({
    type: MSchema.Types.String
  })
  @IsString()
  tagsTitle: string;

  @Prop({
    type: [MSchema.Types.String]
  })
  @IsArray()
  @IsString({
    each: true
  })
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
export type TopPageDocument = HydratedDocument<TopPageModel>;
