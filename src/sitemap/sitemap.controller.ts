import { Controller, Inject } from '@nestjs/common';
import { TopPageService } from 'src/top-page/top-page.service';

@Controller('sitemap')
export class SitemapController {
  constructor(
    private readonly topPageService: TopPageService,
  ) {}
}
