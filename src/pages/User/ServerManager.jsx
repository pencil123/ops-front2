import React, { Component } from "react";
import NodeAPI from "@/api/node_api";
import { Table, Button, PageHeader } from "antd";
import { Form, Input } from "antd";
import { PanesContext } from "@/context/Panes";

export class ServerManager extends Component {
  ServerUpdateRef = React.createRef();
  state = {
    loading: false,
    hostIp: "",
    appCode: "",
    currentPage: 1,
    deleteServer: "",
    visibleDel: false,
    visibleUpdate: false,
  };
  componentDidMount() {
    this.initData();
  }
  initData = async () => {
    this.setState({ loading: true });
    let data = {
      currentPage: this.state.pageNum,
      hostIp: this.state.hostIp,
      appCode: this.state.appCode,
    };
    try {
      let result = await NodeAPI.nodeList(data);
      this.setState({
        records: result.data.records,
        totalCount: result.data.totalCount,
        loading: false,
      });
    } catch (error) {
      console.error(error.error);
      this.setState({
        loading: false,
      });
    }
  };
  pageTurn = (pageTrunObj) => {
    this.setState({ pageNum: pageTrunObj.current }, () => {
      this.initData();
    });
  };
  ipSearchChange = (event) => {
    if (event.target.value === "") {
      this.setState({ switch: "" });
    } else {
      this.setState({ switch: "ipSearch" });
    }
    this.setState({ searchIp: event.target.value });
  };

  sCodeSearchChange = (event) => {
    if (event.target.value === "") {
      this.setState({ switch: "" });
    } else {
      this.setState({ switch: "scodeSearch" });
    }
    this.setState({ appCode: event.target.value });
  };

  formSubmit = (fieldsValue) => {
    this.setState(
      {
        hostIp: fieldsValue.hostIp,
        appCode: fieldsValue.appCode,
        pageNum: 1,
      },
      () => {
        this.initData();
      }
    );
  };
  render() {
    const columns = [
      {
        title: "S码",
        dataIndex: "appCode",
      },
      {
        title: "IP地址",
        dataIndex: "hostIp",
      },
      {
        title: "说明",
        dataIndex: "appName",
      },
      {
        title: "更新时间",
        dataIndex: "createTime",
      },
    ];
    return (
      <>
        <PageHeader
          title="服务器搜索"
          subTitle="搜索条件中服务器IP和S码同时只能选择一个"
          style={{ width: "100%" }}
          extra={
            <Form
              name="basic"
              onFinish={this.formSubmit}
              layout="inline"
              size="large"
            >
              <Form.Item name="hostIp">
                <Input
                  placeholder="IP搜索/多节点以逗号分隔"
                  onChange={this.ipSearchChange}
                  disabled={this.state.switch === "scodeSearch"}
                />
              </Form.Item>
              <Form.Item name="appCode">
                <Input
                  placeholder="S码搜索"
                  onChange={this.sCodeSearchChange}
                  disabled={this.state.switch === "ipSearch"}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          }
        ></PageHeader>
        <Table
          className="ContentPadding"
          rowKey="hostIp"
          onChange={this.pageTurn}
          loading={this.state.loading}
          pagination={{
            current: this.state.pageNum,
            defaultPageSize: 20,
            total: this.state.totalCount,
            showSizeChanger: false,
          }}
          dataSource={this.state.records}
          columns={columns}
        />
      </>
    );
  }
}
ServerManager.contextType = PanesContext;

export default ServerManager;
