import axios from "axios";
import ReactDOM from 'react-dom';
import {Spin } from 'antd';
/**
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
 */

// 当前正在请求的数量
let requestCount = 0
// 显示loading
function showLoading () {
    if (requestCount === 0) {
        var dom = document.createElement('div')
        dom.setAttribute('id', 'loading')
        document.body.appendChild(dom)
        ReactDOM.render(<Spin  animation="border" variant="info" />, dom)
    }
    requestCount++
}

// 隐藏loading
function hideLoading () {
    requestCount--
    if (requestCount === 0) {
        document.body.removeChild(document.getElementById('loading'))
    }
}


export default class Server {
  axios(method, url, data) {
    return new Promise((resolve, reject) => {
      let _option = {
        method,
        url,
        timeout: 300000,
        params: null,
        data: data,
        withCredentials: true, //是否携带cookie发起请求
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        },
      };


      axios.interceptors.request.use(
        (config) => {
          let token = localStorage.getItem("access_token");
          showLoading()
          if (token) {
            config.headers["Access-Token"] = token;
            return config;
          } else {
            delete config.headers["Access-Token"];
            return config;
          }
        },
        (error) => {
            hideLoading()
          Promise.reject(error);
        }
      );


      axios.interceptors.response.use(
        (response) => {
            hideLoading()
          if (response.data.code === 401) {
            window.open("/login", "_self");
            return response;
          } else {
            return response;
          }
        },
        (error) => {
            hideLoading()
          Promise.reject(error);
        }
      );


      axios.request(_option).then(
        (res) => {
          resolve(
            typeof res.data === "object" ? res.data : JSON.parse(res.data)
          );
        },
        (error) => {
          if (error.response) {
            reject(error.response.data);
          } else {
            reject(error);
          }
        }
      );
    });
  }
}
