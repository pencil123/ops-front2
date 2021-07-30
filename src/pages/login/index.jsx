import React, { Component } from "react";
import axios from "axios";

class Index extends Component {
  componentDidMount() {
    console.log("Login page open;");
    if (localStorage.getItem("access_token")) {
      console.log("存在用户的 access_token");
      // eslint-disable-next-line react/prop-types
      this.props.history.push("/");
    }
    if (!this.revToken()) {
      console.log("不存在用户的 access_token");
      this.initToken();
    } else {
      window.open("/", "_self");
    }
  }

  initToken = () => {
    let fullUrl = `/api/v1/prom/applicationClient?appCode=S01129`;
    console.log("跳转获取用户的 access_token");
    axios.get(fullUrl).then(
      (response) => {
        console.log("成功了-----", response.data.data);
        const { client_id, redirect_uri } = response.data.data;
        window.open(
          // eslint-disable-next-line no-undef
          process.env.REACT_APP_ACCOUINT_CENTER_DOMAIN +
            "?responseType=code&client_id=" +
            client_id +
            "&redirect_uri=" +
            redirect_uri +
            "&returnUrl=" +
            // eslint-disable-next-line no-undef
            process.env.REACT_APP_BASEURL +
            "/login#/login",
          "_self"
        );
      },
      (error) => {
        console.log("失败了", error);
      }
    );
  };

  revToken = () => {
    // eslint-disable-next-line react/prop-types
    const token = this.getUrlToken("access_token", this.props.location.search);
    if (token) {
      localStorage.setItem("access_token", token);
    }
    console.log("token info:", token);
    return token ? token : false;
  };

  getUrlToken = (name, str) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = str.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return null;
  };

  render() {
    return <div></div>;
  }
}
export default Index;
