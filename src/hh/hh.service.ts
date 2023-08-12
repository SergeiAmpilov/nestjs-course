import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_URL } from './hh.constants';

@Injectable()
export class HhService {
  token: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.token = this.configService.get('HH_TOKEN') ?? '';
  }


  async getData(text: string) {
    const res = await this.httpService.get(API_URL.vacancies, {
      params: {
        text,
        cluster: true
      },
      headers: {
        'User-Agent': 'OwlTop/1.0 (antonlaricher@gmail.com)',
        Authorization: 'Bearer ' + this.token,
      }
    }).toPromise();
  }
}
