import Server from './server'
import {getUrlConcat} from '../utils/commons';

class AuthAPI extends Server {

  async userRole(){
    try {
      let result = await this.axios("get", '/api/v1/prom/account/admin');
      if (result) {
        return result;
      } else {
        let err = {
          tip: '获取管理员用户失败',
          response: result,
        };
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }
}

export default new AuthAPI()