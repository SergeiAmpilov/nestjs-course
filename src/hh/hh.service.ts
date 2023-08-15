import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  API_URL,
  CLUSTER_SALARY_NOT_FOUND_ERROR,
  SALARY_CLUSTER_ID,
} from './hh.constants';
import { firstValueFrom } from 'rxjs';
import { HhResponse } from './hh.models';
import { HHSalary } from 'src/top-page/top-page.model/top-page.model';

@Injectable()
export class HhService {
  private token: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.token = this.configService.get('HH_TOKEN') ?? '';
  }

  async getData(text: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(API_URL.vacancies, {
          params: {
            text,
            cluster: true,
          },
          headers: {
            'User-Agent': 'OwlTop/1.0 (antonlaricher@gmail.com)',
            Authorization: 'Bearer ' + this.token,
          },
        }),
      );

      return this.parseData(data);
    } catch (e) {
      Logger.error(e);
    }
  }

  private parseData(data: HhResponse): HHSalary {
    const salaryCluster = data.clusters.find((c) => c.id === SALARY_CLUSTER_ID);

    if (!salaryCluster) {
      throw new Error(CLUSTER_SALARY_NOT_FOUND_ERROR);
    }

    const juniorSalary = this.getSalaryFromString(salaryCluster.items[0].name);
    const middleSalary = this.getSalaryFromString(
      salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name,
    );
    const seniorSalary = this.getSalaryFromString(
      salaryCluster.items[salaryCluster.items.length - 1].name,
    );

    return {
      count: data.found,
      juniorSalary,
      middleSalary,
      seniorSalary,
    };
  }

  private getSalaryFromString(salary: string): number {
    const numberRegExp = /(\d+)/g;
    const res = salary.match(numberRegExp);

    if (!res) {
      return 0;
    }

    return Number(res[0]);
  }
}
