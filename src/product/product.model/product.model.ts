import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Schema as MSchema } from "mongoose";

@Schema()
export class ProductCharacteristic {

  @Prop()
  name: string;

  @Prop()
  value: string;
}

export const ProductCharacteristicSchema = SchemaFactory.createForClass(ProductCharacteristic);



@Schema({
  timestamps: true,
})
export class ProductModel extends Document {

  // _id: string;

  @Prop({
    type: MSchema.Types.String,
  })
  image: string;

  @Prop({
    type: MSchema.Types.String,
  })
  title: string;

  @Prop({
    type: MSchema.Types.Number,
  })
  price: number;

  @Prop({
    type: MSchema.Types.Number,
  })
  oldPrice: number;

  @Prop({
    type: MSchema.Types.Number,
  })
  credit: number;

  @Prop({
    type: MSchema.Types.Number,
  })
  calculatedRating: number;
  
  @Prop({
    type: MSchema.Types.String,
  })
  description: string;

  @Prop({
    type: MSchema.Types.String,
  })
  advantages: string;

  @Prop({
    type: MSchema.Types.String,
  })
  disadvantages: string;

  @Prop({
    type: [MSchema.Types.String],
  })
  categories: string[];

  @Prop({
    type: [MSchema.Types.String],
  })
  tags: string[];

  @Prop({
    type: [ProductCharacteristicSchema],
    _id: false,
  })
  characteristics: ProductCharacteristic[]

}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
export type ProductDocument = HydratedDocument<ProductModel>;