import Server from './server'
import {getUrlConcat} from '../utils/commons';

class DashBoardAPI extends Server {
  async userDashBoard(data){
    try {
      let result = await this.axios("get", '/api/v1/prom/application/user/show');
      if (result) {
        return result;
      } else {
        let err = {
          tip: '用户的DashBoard 数据加载失败',
          response: result,
        };
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }

  async sCodeDashBoard(data){
    try {
      let result = await this.axios("get", '/api/v1/prom/application/show' + getUrlConcat(data));
      if (result) {
        return result;
      } else {
        let err = {
          tip: 'SCode的DashBoard 数据加载失败',
          response: result,
        };
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }
}

export default new DashBoardAPI()