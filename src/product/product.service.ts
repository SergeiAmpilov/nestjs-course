import { Injectable } from '@nestjs/common';
import { ProductDocument, ProductModel } from './product.model/product.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name) private readonly productModel: Model<ProductDocument>,
  ) {  }


  async createProduct(dto: CreateProductDto): Promise<ProductDocument> {
    return this.productModel.create(dto);
  }

  async findById(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, dto: CreateProductDto) {

    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();

  }
}
