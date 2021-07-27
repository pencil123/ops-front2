import Server from "./server";
import { getUrlConcat } from "@/utils/commons";

class MetricAPI extends Server {
  async metricList(data) {
    try {
      let result = await this.axios(
        "get",
        "/api/v1/prom/indicator/find/page" + getUrlConcat(data)
      );
      if (result) {
        return result;
      } else {
        let err = {
          tip: "获取能效指标数据失败",
          response: result,
        };
        throw err;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  async metricCollectList(data) {
    try {
      let result = await this.axios(
        "get",
        "/api/v1/prom/indicator/find/collect/page" + getUrlConcat(data)
      );
      if (result) {
        return result;
      } else {
        let err = {
          tip: "能效指标聚合数据获取失败",
          response: result,
        };
        throw err;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async indicatorExport(data) {
    try {
      let result = await this.axios(
        "get",
        "/api/v1/prom/indicator/find/page/export" + getUrlConcat(data),
        "",
        { responseType: "blob" }
      );
      if (result) {
        return result;
      } else {
        let err = {
          tip: "能效指标聚合数据获取失败",
          response: result,
        };
        throw err;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async collectExport(data) {
    try {
      let result = await this.axios(
        "get",
        "/api/v1/prom/indicator/find/collect/export" + getUrlConcat(data),
        "",
        { responseType: "blob" }
      );
      if (result) {
        return result;
      } else {
        let err = {
          tip: "能效指标聚合数据获取失败",
          response: result,
        };
        throw err;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new MetricAPI();
