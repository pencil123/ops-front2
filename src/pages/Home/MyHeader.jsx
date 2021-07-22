import React, { Component } from "react";
import { Menu, Avatar } from "antd";
import Icon from "@ant-design/icons";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { PanesContext } from "@/context/Panes";
import Dashboard from "../Dashboard/Dashboard";
const SubMenu = Menu.SubMenu;
export class MyHeader extends Component {
  /**
   * 切换侧边栏的折叠和展开
   */
  toggleCollapsed() {
    this.context.updateState({ collapsed: !this.context.collapsed });
  }
  /**
   * 退出登录
   */
  //   onLogout = () => {
  //     logout(); //清空cookie
  //     this.props.history.push("/login");
  //   };
  componentDidMount() {
    this.context.updateState({
      panes: [
        {
          name: "DashBoard",
          key: "dashboard",
          content: <Dashboard />,
        },
      ],
      activeMenu: "dashboard",
    });
  }

  render() {
    const { user } = this.props;
    return (
      <div
        style={{ background: "#fff", padding: "0 16px" }}
        className="myHeader"
      >
        <div style={{ fontSize: 18, display: "inline", lineHeight: "64px" }}>
          {this.context.collapsed ? (
            <MenuUnfoldOutlined onClick={() => this.toggleCollapsed()} />
          ) : (
            <MenuFoldOutlined onClick={() => this.toggleCollapsed()} />
          )}
        </div>
        <div className="headerRight">
          <div className="headerItem">
            <Menu
              mode="horizontal"
              selectable={false}
              className="headerHorizontal"
            >
              <SubMenu
                key={"avatarMenu"}
                title={
                  <div className="avatarBox">
                    <Avatar size="small" src={user.avatar} />
                    &nbsp;<span>{user.username}</span>
                  </div>
                }
              >
                <Menu.Item
                  key={2}
                  onClick={this.onLogout}
                  className="logoutButton"
                >
                  <Icon type="logout" />
                  退出登录
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

MyHeader.propTypes = {
  user: PropTypes.object,
};
MyHeader.contextType = PanesContext;
export default MyHeader;
