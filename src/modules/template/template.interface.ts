export type TemplateModuleOptions = {
  dir: string;
};

export interface TemplateAdapter {
  compile(data: any): string | Promise<string>;
}
