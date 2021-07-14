import Server from './server'
import {getUrlConcat} from '../utils/commons';

class DomainAPI extends Server {
  async getSubDomain(data){
    try {
      let result = await this.axios("get", '/api/v1/icp/domain/sub/page' + getUrlConcat(data));
      if (result) {
        return result;
      } else {
        let err = {
          tip: '获取域名的二级域名列表',
          response: result,
        };
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }
}

export default new DomainAPI()