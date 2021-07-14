import React from "react";
import { Layout } from "antd";
import MySider from "./MySider";
import MyContent from "./MyContent";
import MyFooter from "./MyFooter";
import MyHeader from "./MyHeader";

const { Sider } = Layout;

export class index extends React.Component {
  state = {
    collapsed: false, //侧边栏的折叠和展开
    panes: [], //网站打开的标签页列表
    activeMenu: "", //网站活动的菜单
    theme: localStorage.getItem("theme") || "light", //侧边栏主题
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  _setState = (obj) => {
    this.setState(obj);
    console.log("输出Obj:",obj)
  };
  render() {
    const { collapsed, panes, activeMenu, theme } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <MySider
            theme={theme}
            panes={panes}
            activeMenu={activeMenu}
            onChangeState={this._setState}
          />
        </Sider>
        <Layout className="site-layout">
          <MyHeader />
          <MyContent
            panes={panes}
            activeMenu={activeMenu}
            onChangeState={this._setState}
          />
          <MyFooter />
        </Layout>
      </Layout>
    );
  }
}
export default index;
