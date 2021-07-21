import React, { Component } from "react";
import { Menu, Avatar } from "antd";
import Icon from "@ant-design/icons";
import PropTypes from "prop-types";
const SubMenu = Menu.SubMenu;
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
  /**
   * 切换侧边栏的折叠和展开
   */
  toggleCollapsed = () => {
    this.props.onChangeState({
      collapsed: !this.props.collapsed,
    });
  };

  /**
   * 展开/关闭修改信息模态框
   */
  toggleInfoVisible = (visible) => {
    this.setState({
      infoVisible: visible,
    });
  };
  /**
   * 展开/关闭修改密码模态框
   */
  togglePasswordVisible = (visible) => {
    this.setState({
      passwordVisible: visible,
    });
  };
  /**
   * 退出登录
   */
  //   onLogout = () => {
  //     logout(); //清空cookie
  //     this.props.history.push("/login");
  //   };
  render() {
    const { user } = this.props;
    return (
      <div style={{ background: "#fff", padding: "0 16px" }}>
        <Icon
          style={{ fontSize: 18 }}
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.toggleCollapsed}
        />
        <div style={styles.headerRight}>
          <div style={styles.headerItem}>
            <Menu mode="horizontal" selectable={false}>
              <SubMenu
                title={
                  <div style={styles.avatarBox}>
                    <Avatar size="small" src={user.avatar} />
                    &nbsp;<span>{user.username}</span>
                  </div>
                }
              >
                <Menu.Item key={2} onClick={this.onLogout}>
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

const styles = {
  headerRight: {
    float: "right",
    display: "flex",
    height: 64,
    marginRight: 50,
  },
  headerItem: {
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
  },
  avatarBox: {
    display: "flex",
    alignItems: "center",
  },
};
MyHeader.propTypes = {
  collapsed: PropTypes.string,
  user: PropTypes.object,
  onChangeState: PropTypes.func,
};
export default MyHeader;
