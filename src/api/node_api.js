import Server from './server'
import {getUrlConcat} from '../utils/commons';

class NodeAPI extends Server {
  async nodeAdd(data){
    try {
      let result = await this.axios("post", '/api/v1/prom/node/add',data);
      if (result) {
        return result;
      } else {
        let err = {
          tip: '添加服务器节点失败',
          response: result,
        };
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }
  async nodeList(data){
    try {
      let result = await this.axios("get", '/api/v1/prom/node/find/page' + getUrlConcat(data));
      if (result) {
        return result;
      } else {
        let err = {
          tip: '添加服务器节点失败',
          response: result,
        };
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }

  async nodeDelete(data){
    try {
      let result = await this.axios("get", '/api/v1/prom/node/delete' + getUrlConcat(data));
      if (result) {
        return result;
      } else {
        let err = {
          tip: '添加服务器节点失败',
          response: result,
        };
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }


  async update(data){
    try {
      let result = await this.axios("post", '/api/v1/prom/node/update',data);
      if (result) {
        return result;
      } else {
        let err = {
          tip: '服务器节点更新失败',
          response: result,
        };
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }



}

export default new NodeAPI()