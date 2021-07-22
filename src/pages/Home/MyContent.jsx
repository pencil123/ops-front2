import React, { Component } from "react";
import { Tabs, Carousel, Layout } from "antd";
import { PanesContext } from "../../context/Panes";
const { Content } = Layout;
const TabPane = Tabs.TabPane;

export class MyContent extends Component {
  /**
   *  标签页的改变触发的函数
   */
  onChange = (activeKey) => {
    this.context.updateState({
      activeMenu: activeKey,
    });
  };
  onEdit = (targetKey, action) => {
    if (action === "remove") {
      this.remove(targetKey);
    }
  };
  /**
   * 关闭标签页
   */
  remove = (targetKey) => {
    let activeMenu = this.context.activeMenu;
    let panes = this.context.panes.slice();
    let preIndex = panes.findIndex((item) => item.key === targetKey) - 1;
    preIndex = Math.max(preIndex, 0);

    panes = panes.filter((item) => item.key !== targetKey);

    if (targetKey === activeMenu) {
      activeMenu = panes[preIndex] ? panes[preIndex].key : "";
    }
    this.context.updateState({
      activeMenu,
      panes,
    });
  };

  render() {
    const { panes, activeMenu } = this.context;
    return (
      <Content style={{ margin: "0 16px" }}>
        <div className="content-container">
          {panes.length ? (
            <Tabs
              style={{ height: "100%" }}
              tabBarStyle={{ marginBottom: 0 }}
              onEdit={this.onEdit}
              onChange={this.onChange}
              activeKey={activeMenu}
              type="editable-card"
              hideAdd
            >
              {panes.map((item) => (
                <TabPane key={item.key} tab={item.name}>
                  <div className="tabpane-box">{item.content}</div>
                </TabPane>
              ))}
            </Tabs>
          ) : (
            <div className="bg-box">
              <Carousel className="bg-size" autoplay autoplaySpeed={5000}>
                <span></span>
              </Carousel>
            </div>
          )}
        </div>
      </Content>
    );
  }
}

MyContent.contextType = PanesContext;

export default MyContent;
