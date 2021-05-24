import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { ClientOptions } from '@elastic/elasticsearch';

export interface ElasticModuleOptions extends ClientOptions {}

export interface ElasticOptionsFactory {
  createElasticOptions(): Promise<ElasticModuleOptions> | ElasticModuleOptions;
}

export interface ElasticModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<ElasticOptionsFactory>;
  useClass?: Type<ElasticOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<ElasticModuleOptions> | ElasticModuleOptions;
  inject?: any[];
}
