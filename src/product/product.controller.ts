import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductModel } from './product.model/product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import {  PRODUCT_NOT_FOUND_ERROR } from './product.constants';
import { IdValifationPipe } from 'src/pipes/id-validation.pipes';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('product')
export class ProductController {

  constructor(
    private readonly productService: ProductService,
  ) {

  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() dto: CreateProductDto
  ) {

    return this.productService.createProduct(dto);

  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(
    @Param('id', IdValifationPipe) id: string
  ) {
    const product = await this.productService.findById(id);

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    }

    return product;

  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id', IdValifationPipe) id: string
  ) {

    const deleteProduct = await this.productService.delete(id);

    if (!deleteProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    }

  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValifationPipe) id: string,
    @Body() dto: CreateProductDto
  ) {

    const updatedProduct = await this.productService.update(id, dto);
    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    }

    return updatedProduct;

  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(
    @Body() dto: FindProductDto
  ) {
    return this.productService.findWithReviews(dto);

  }


}
