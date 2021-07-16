import React from "react";
import { Layout } from "antd";

import { PanesContext, PanesActions } from "../../context/Panes";

import MySider from "./MySider";
import MyContent from "./MyContent";
import MyFooter from "./MyFooter";
import MyHeader from "./MyHeader";

const { Sider } = Layout;

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

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  _setState = (obj) => {
    this.setState(obj);
    console.log("输出Obj:", obj);
  };
  render() {
    const { collapsed} = this.state;
    return (
      <PanesContext.Provider value={this.state}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <MySider/>
          </Sider>
          <Layout className="site-layout">
            <MyHeader />
            <MyContent/>
            <MyFooter />
          </Layout>
        </Layout>
      </PanesContext.Provider>
    );
  }
}
export default index;
