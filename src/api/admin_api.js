import Server from './server'
import {getUrlConcat} from '../utils/commons';

class AdminAPI extends Server {
  /**
   * 添加管理员接口
   * @param data
   * @returns {Promise<any>}
   */
  async adminAdd(data) {
    try {
      let result = await this.axios("post", '/api/v1/prom/account/add', data);
      if (result) {
        return result;
      } else {
        let err = {
          tip: '用户添加失败',
          response: result,
        };
        throw err;
      }
    } catch (err) {
        console.log(err)
      throw err;
    }
  }

  async adminList(){
    try {
      let result = await this.axios("get", '/api/v1/prom/account/find/page');
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
        console.log(err)
      throw err;
    }
  }

  async adminDelete(data){
    try {
      let result = await this.axios("get", '/api/v1/prom/account/delete' + getUrlConcat(data));
      if (result) {
        return result;
      } else {
        let err = {
          tip: '删除用户失败',
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

export default new AdminAPI()