import Server from './server'
import {getUrlConcat} from '../utils/commons';

class LogAPI extends Server {
  async list(data){
    try {
      let result = await this.axios("get", '/api/v1/icp/log/page' + getUrlConcat(data));
      if (result) {
        return result;
      } else {
        let err = {
          tip: '获取域名日志',
          response: result,
        };
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }
}

export default new LogAPI()