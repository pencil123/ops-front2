import React, { Component } from "react";
import { PanesContext } from "../../context/Panes";
import { tabs, menu } from "../tabs";
import AuthAPI from "@/api/auth_api";
import { createFromIconfontCN } from "@ant-design/icons";
import { Menu, Layout } from "antd";
const { Sider } = Layout;
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2690980_naje3qeivf8.js",
});
export class MySider extends Component {
  state = {
    openKeys: "",
  };
  componentDidMount() {
    this.initRole();
  }
  initRole = async () => {
    if (!localStorage.getItem("access_token")) {
      return;
    }
    let isManager = sessionStorage.getItem("isManager");
    if (isManager === "undefined" || isManager === null) {
      let result = await AuthAPI.userRole();
      if (result.data.roleKey === "admin") {
        isManager = true;
      } else {
        isManager = false;
      }
      sessionStorage.setItem("isManager", isManager);
      this.initRole();
    }
    if (isManager === "false") {
      menu.pop();
      console.log("侧边栏列表：", menu);
    }
  };
  /**
   * 生成侧边栏菜单
   */
  renderMenu = (menu) => {
    if (Array.isArray(menu)) {
      return menu.map((item) => {
        if (!item.children || !item.children.length) {
          return (
            <Menu.Item key={item.key || item.name}>
              <div onClick={() => this.addPane(item)}>
                <IconFont type={item.icon} />
                <span>{item.name}</span>
              </div>
            </Menu.Item>
          );
        } else {
          return (
            <Menu.SubMenu
              key={item.key}
              title={
                <span>
                  <IconFont type={item.icon} />
                  <span>{item.name}</span>
                </span>
              }
            >
              {this.renderMenu(item.children)}
            </Menu.SubMenu>
          );
        }
      });
    }
  };
  /**
   * 点击侧边栏菜单添加标签页
   */
  addPane = (item) => {
    const panes = this.context.panes.slice();
    const activeMenu = item.key;
    //如果标签页不存在就添加一个
    if (!panes.find((i) => i.key === activeMenu)) {
      panes.push({
        name: item.name,
        key: item.key,
        content: tabs[item.key] || item.name,
      });
    }
    this.context.updateState({ panes, activeMenu });
  };
  onOpenChange = (keys) => {
    const latestOpenKey = keys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    );
    this.setState({ openKeys: [latestOpenKey] });
  };

  onCollapse = (collapsed) => {
    this.context.updateState({ collapsed }, () => {
      console.log(this.state);
    });
  };

  render() {
    const { activeMenu, theme } = this.context;
    return (
      <Sider
        className="mySiderClass"
        collapsible
        collapsed={this.context.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className={`my-sider`}>
          <div className={`sider-menu-logo`}>
            <a href="/" rel="noopener noreferrer">
              <img
                // eslint-disable-next-line no-undef
                src={require("../../assets/images/logo.png").default}
                alt="Logo"
                style={{ margin: "30px auto", display: "block" }}
              />
            </a>
          </div>
          <Menu
            theme={theme}
            mode="inline"
            selectedKeys={[activeMenu]}
            style={{ paddingTop: 16 }}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
          >
            {this.renderMenu(menu)}
          </Menu>
        </div>
      </Sider>
    );
  }
}

MySider.contextType = PanesContext;
export default MySider;
