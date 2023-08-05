import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { TopPageModel } from './top-page.model/top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { ConfigService } from '@nestjs/config';
import { TopPageService } from './top-page.service';
import { TOP_PAGE_NOT_FOUND_BY_ID } from './top-page.constants';


@Controller('top-page')
export class TopPageController {

  constructor( 
    private readonly configService: ConfigService,
    private readonly topPageService: TopPageService,
    ) {}

  @Post('create')
  async create(
    @Body() dto: Omit<TopPageModel, '_id'>
  ) {

    return this.topPageService.create(dto);

  }

  @Get(':id')
  async get(
    @Param('id') id: string
  ) {

    const topPage = await this.topPageService.findById(id);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_BY_ID);
    }

    return topPage;

  }

  @Delete(':id')
  async delete(
    @Param('id') id: string
  ) {

    const topPage = await this.topPageService.delete(id);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_BY_ID);
    }

  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() dto: TopPageModel
  ) {

    const updatedTopPage = await this.topPageService.update(id, dto);
    if (!updatedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_BY_ID)
    }

    return updatedTopPage;

  }

  @HttpCode(200)
  @Post()
  async find(
    @Body() dto: FindTopPageDto
  ) {

    return this.topPageService.findByFilter(dto);

  }

}
