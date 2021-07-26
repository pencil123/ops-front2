import React from "react";
import { Layout } from "antd";
import { PanesContext, PanesActions } from "../../context/Panes";

import "./home.less";
import MySider from "./MySider";
import MyContent from "./MyContent";
import MyFooter from "./MyFooter";
import MyHeader from "./MyHeader";

export class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false, //侧边栏的折叠和展开
      panes: [], //网站打开的标签页列表
      activeMenu: "", //网站活动的菜单
      ...PanesActions(this),
    };
  }

  render() {
    return (
      <PanesContext.Provider value={this.state}>
        <Layout style={{ minHeight: "100vh" }}>
          <MySider />
          <Layout className="site-layout">
            <MyHeader
              user={{
                username: "lyzhang",
                avatar:
                  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
              }}
            />
            <MyContent />
            <MyFooter />
          </Layout>
        </Layout>
      </PanesContext.Provider>
    );
  }
}
export default index;
