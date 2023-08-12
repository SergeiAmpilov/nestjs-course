import { Module } from '@nestjs/common';
import { HhService } from './hh.service';
import { TopPageModule } from 'src/top-page/top-page.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [HhService],
  imports: [
    TopPageModule,
    ConfigModule,
  ],
  exports: [HhService]
})
export class HhModule {}
