import Server from './server'
import {getUrlConcat} from '../utils/commons';

class IcpAPI extends Server {
  async list(data){
    try {
      let result = await this.axios("get", '/api/v1/icp/result/page' + getUrlConcat(data));
      if (result) {
        return result;
      } else {
        let err = {
          tip: '获取域名ICP备案情况',
          response: result,
        };
        throw err;
      }
    } catch (err) {
        console.log(err)
      throw err;
    }
  }
  async update(data){
    try {
      let result = await this.axios("post", '/api/v1/icp/update',data);
      if (result) {
        return result;
      } else {
        let err = {
          tip: '更新ICP域名信息',
          response: result,
        };
        throw err;
      }
    } catch (err) {
        console.log(err)
      throw err;
    }
  }


  async detectable(data){
    try {
      let result = await this.axios("post", '/api/v1/icp/detectable',data);
      if (result) {
        return result;
      } else {
        let err = {
          tip: '更新域名是否检测',
          response: result,
        };
        throw err;
      }
    } catch (err) {
        console.log(err)
      throw err;
    }
  }
}

export default new IcpAPI()