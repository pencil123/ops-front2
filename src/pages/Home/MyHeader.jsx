import React, { Component } from "react";

export class MyHeader extends Component {
  constructor(props) {
    super(props);
    const userTheme = JSON.parse(localStorage.getItem("user-theme"));
    let color = "#13C2C2";
    if (userTheme) {
      window.less.modifyVars(userTheme);
      color = userTheme["@primary-color"];
    }
    this.state = {
      isFullscreen: false, //控制页面全屏
      color: color,
      infoVisible: false, //控制修改用户信息的模态框
      passwordVisible: false, //控制修改密码的模态框
    };
  }
  render() {
    return (
      <div style={{padding: "0 16px",height:64 }}>
      </div>
    );
  }
}


export default MyHeader;
