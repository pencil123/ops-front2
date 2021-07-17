import Server from './server'
import {getUrlConcat} from '../utils/commons';

class SkywalkingAPI extends Server {
  async listApp(data){
    try {
      let result = await this.axios("get", '/api/v1/skywalking/service/page' + getUrlConcat(data));
      if (result) {
        return result;
      } else {
        let err = {
          tip: '根据S码获取App列表失败',
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

export default new SkywalkingAPI()