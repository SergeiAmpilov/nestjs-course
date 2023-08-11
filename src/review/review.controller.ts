import { 
  Body, Controller, Delete, Get, 
  HttpException, HttpStatus, Param, Post, UseGuards, 
  UsePipes, ValidationPipe 
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { IdValifationPipe } from 'src/pipes/id-validation.pipes';
import { TelegramService } from 'src/telegram/telegram.service';


@Controller('review')
export class ReviewController {


  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(
    @Body() dto: CreateReviewDto
  ) {
    return this.reviewService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('notify')
  async notify(
    @Body() dto: CreateReviewDto
  ) {
    const message = `Name: ${dto.name}\n` 
    + `Title: ${dto.title}\n` 
    + `Description: ${dto.description}\n` 
    + `Rating: ${dto.rating}` 
    + `id: ${dto.productId}\n`;
    return this.telegramService.sendMessage(message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id', IdValifationPipe) id: string
  ) {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  
  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId', IdValifationPipe) productId: string,
  ) {

  
    return this.reviewService.findByProductId(productId);

  }


}
