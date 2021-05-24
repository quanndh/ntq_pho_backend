import { Module, DynamicModule, Global } from '@nestjs/common';
import { HandlebarsAdapter } from './adapters/handlebars';
import { TemplateModuleOptions } from './template.interface';
import { TEMPLATE_MODULE_OPTIONS } from './template.constants';

@Global()
@Module({
  providers: [HandlebarsAdapter],
  exports: [HandlebarsAdapter],
})
export class TemplateModule {
  static forRoot(options?: TemplateModuleOptions): DynamicModule {
    return {
      module: TemplateModule,
      providers: [
        {
          provide: TEMPLATE_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
