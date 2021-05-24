import { Injectable, Inject } from "@nestjs/common";
import { Client, RequestParams, ApiResponse } from "@elastic/elasticsearch";
import { ELASTICSEARCH_CLIENT } from "./elastic.provider";

@Injectable()
export class ElasticService {
  constructor(
    @Inject(ELASTICSEARCH_CLIENT) private readonly esClient: Client
  ) {}

  getClient(): Client {
    return this.esClient;
  }

  getSource(params: RequestParams.GetSource) {
    return this.esClient.getSource(params);
  }

  clearScroll(params: RequestParams.ClearScroll) {
    return this.esClient.clearScroll(params);
  }

  ping(params: RequestParams.Ping) {
    return this.esClient.ping(params);
  }

  search<T extends any>(params: RequestParams.Search): Promise<ApiResponse<T>> {
    return this.esClient.search(params);
  }

  scroll<T extends any>(params: RequestParams.Scroll): Promise<ApiResponse<T>> {
    return this.esClient.scroll(params);
  }

  count(params: RequestParams.Count) {
    return this.esClient.count(params);
  }

  create(params: RequestParams.Create) {
    return this.esClient.create(params);
  }

  update(params: RequestParams.Update) {
    return this.esClient.update(params);
  }

  updateByQuery(params: RequestParams.UpdateByQuery) {
    return this.esClient.updateByQuery(params);
  }

  delete(params: RequestParams.Delete) {
    return this.esClient.delete(params);
  }

  deleteByQuery(params: RequestParams.DeleteByQuery) {
    return this.esClient.deleteByQuery(params);
  }

  deleteScript(params: RequestParams.DeleteScript) {
    return this.esClient.deleteScript(params);
  }

  exists() {
    return this.esClient.exists();
  }

  bulk(params: RequestParams.Bulk) {
    return this.esClient.bulk(params);
  }

  fieldCaps(params: RequestParams.FieldCaps) {
    return this.esClient.fieldCaps(params);
  }

  get<T extends any>(params: RequestParams.Get): Promise<ApiResponse<T>> {
    return this.esClient.get(params);
  }

  index<T = Record<string, any>>(
    params: RequestParams.Index<T>
  ): Promise<ApiResponse<T>> {
    return this.esClient.index(params);
  }

  info(params: RequestParams.Info) {
    return this.esClient.info(params);
  }

  close() {
    return this.esClient.close();
  }
}
