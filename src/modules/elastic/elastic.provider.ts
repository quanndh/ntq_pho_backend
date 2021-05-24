import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ELASTICSEARCH_MODULE_OPTIONS } from './elastic.constants';
import { ElasticModuleOptions } from './interfaces';

export const ELASTICSEARCH_CLIENT = 'ELASTICSEARCH_CLIENT';

export const createElasticClient = () => ({
  provide: ELASTICSEARCH_CLIENT,
  useFactory: (options: ElasticModuleOptions) => {
    return new Client(options);
  },
  inject: [ELASTICSEARCH_MODULE_OPTIONS],
});

@Injectable()
export class ElasticProvider {}
