import React, { Component } from "react";
import { Tabs, Carousel, Layout } from "antd";
import { PanesContext } from "../../context/Panes";
const { Content } = Layout;
const TabPane = Tabs.TabPane;
const imgs = [
  `${process.env.REACT_APP_BASE_URL}/public/images/bg1.jpg`,
  `${process.env.REACT_APP_BASE_URL}/public/images/bg2.jpg`,
  `${process.env.REACT_APP_BASE_URL}/public/images/bg3.jpg`,
];


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
      <Content style={{ margin: "0 16px"}}>
        <div className="content-container">
          {panes.length ? (
            <Tabs
              style={{ height: "100%"}}
              tabBarStyle={{ background: "#f0f2f5", marginBottom: 0,color:"white" }}
              onEdit={this.onEdit}
              onChange={this.onChange}
              activeKey={activeMenu}
              type="editable-card"
              hideAdd
            >
              {panes.map((item) => (
                <TabPane key={item.key} tab={item.name} >
                  <div className="tabpane-box">{item.content}</div>
                </TabPane>
              ))}
            </Tabs>
          ) : (
            <div className="bg-box">
              <Carousel className="bg-size" autoplay autoplaySpeed={5000}>
                {imgs.map((item) => (
                  <div className="bg-size" key={item}>
                    <img
                      src={item}
                      alt=""
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>
      </Content>
    );
  }
}

MyContent.contextType = PanesContext

export default MyContent;
