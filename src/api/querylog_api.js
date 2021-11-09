import Server from "./server";
import { getUrlConcat } from "../utils/commons";
class QuerylogAPI extends Server {
  async getDashboard() {
    try {
      let result = await this.axios("get", "/api/v1/querylog/dashboard");
      if (result) {
        return result;
      } else {
        let err = {
          tip: "获取QueryLog 的信息",
          response: result,
        };
        throw err;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getStatByScode(data) {
    try {
      let result = await this.axios(
        "get",
        "/api/v1/querylog/domains" + getUrlConcat(data)
      );
      if (result) {
        return result;
      } else {
        let err = {
          tip: "获取QueryLog 的信息",
          response: result,
        };
        throw err;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async queryPage(data) {
    try {
      let result = await this.axios(
        "get",
        "/api/v1/querylog/find/page" + getUrlConcat(data)
      );
      if (result) {
        return result;
      } else {
        let err = {
          tip: "获取QueryLog 的分页信息",
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

export default new QuerylogAPI();
