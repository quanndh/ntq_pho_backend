import { Module, DynamicModule, Provider } from '@nestjs/common';
import { ElasticService } from './elastic.service';
import { createElasticClient } from './elastic.provider';
import { ELASTICSEARCH_MODULE_OPTIONS } from './elastic.constants';
import {
  ElasticModuleAsyncOptions,
  ElasticModuleOptions,
  ElasticOptionsFactory,
} from './interfaces/elastic-module-options.interface';

@Module({
  providers: [ElasticService],
  exports: [ElasticService],
})
export class ElasticModule {
  static register(options: ElasticModuleOptions): DynamicModule {
    return {
      module: ElasticModule,
      providers: [createElasticClient(), { provide: ELASTICSEARCH_MODULE_OPTIONS, useValue: options }],
    };
  }

  static registerAsync(options: ElasticModuleAsyncOptions): DynamicModule {
    return {
      module: ElasticModule,
      imports: options.imports || [],
      providers: [createElasticClient(), ...this.createAsyncProviders(options)],
    };
  }

  private static createAsyncProviders(options: ElasticModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    if (options.useClass)
      return [
        this.createAsyncOptionsProvider(options),
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
      ];
    return [];
  }

  private static createAsyncOptionsProvider(options: ElasticModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: ELASTICSEARCH_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    if (options.useExisting)
      return {
        provide: ELASTICSEARCH_MODULE_OPTIONS,
        useFactory: async (optionsFactory: ElasticOptionsFactory) => optionsFactory.createElasticOptions(),
        inject: [options.useExisting],
      };
    if (options.useClass)
      return {
        provide: ELASTICSEARCH_MODULE_OPTIONS,
        useFactory: async (optionsFactory: ElasticOptionsFactory) => optionsFactory.createElasticOptions(),
        inject: [options.useClass],
      };
    return {
      provide: ELASTICSEARCH_MODULE_OPTIONS,
      useValue: undefined,
    };
  }
}
