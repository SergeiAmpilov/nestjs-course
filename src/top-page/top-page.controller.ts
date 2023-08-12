import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TopPageModel } from './top-page.model/top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { TOP_PAGE_NOT_FOUND_BY_ALIAS, TOP_PAGE_NOT_FOUND_BY_ID } from './top-page.constants';
import { IdValifationPipe } from 'src/pipes/id-validation.pipes';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { HhService } from 'src/hh/hh.service';


@Controller('top-page')
export class TopPageController {

  constructor( 
    private readonly topPageService: TopPageService,
    private readonly hhService: HhService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() dto: CreateTopPageDto
  ) {

    return this.topPageService.create(dto);

  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(
    @Param('id', IdValifationPipe) id: string
  ) {

    const topPage = await this.topPageService.findById(id);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_BY_ID);
    }

    return topPage;

  }

  @Get('byAlias/:alias')
  async getByAlias(
    @Param('alias') alias: string
  ) {

    const topPage = await this.topPageService.findByAlias(alias);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_BY_ALIAS);
    }

    return topPage;

  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id', IdValifationPipe) id: string
  ) {

    const topPage = await this.topPageService.delete(id);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_BY_ID);
    }

  }

  @Patch(':id')
  async patch(
    @Param('id', IdValifationPipe) id: string,
    @Body() dto: CreateTopPageDto
  ) {

    const updatedTopPage = await this.topPageService.update(id, dto);
    if (!updatedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_BY_ID)
    }

    return updatedTopPage;

  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(
    @Body() { firstCategory }: FindTopPageDto
  ) {

    return this.topPageService.findByCategory(firstCategory);

  }


  @Get('textSearch/:text')
  async textSearch(
    @Param('text') text: string
  ) {

    return this.topPageService.findByText(text);
  }

  @Post('test')
  async test() {
    const data = await this.topPageService.findForHhUpdate(new Date());

    for( let page of data) {
      const hhData = await this.hhService.getData(page.category);
      page.hh = hhData;
      await this.topPageService.update(page._id, page);
    }


  }

}
