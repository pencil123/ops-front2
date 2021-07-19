import React, { Component } from "react";
import NodeAPI from "@/api/node_api";
import { Table, Button } from "antd";
import { PanesContext } from "@/context/Panes";

export class ServerManager extends Component {
  state = {
    loading: false,
  };
  componentDidMount() {
    this.initData();
  }
  initData = async () => {
    let data = {};
    if (this.state.searchType === "hostIp" && this.state.searchValue !== "") {
      data.hostIp = this.state.searchValue;
    } else if (
      this.state.searchValue !== "" &&
      this.state.searchValue !== null
    ) {
      data.applicationId = this.state.searchValue;
    }
    if (this.state.pageNum !== "" && this.state.pageNum != null) {
      data.currentPage = this.state.pageNum;
    }
    let result = await NodeAPI.nodeList(data);
    this.setState({
      records: result.data.records,
      totalCount: result.data.totalCount,
    });
  };
  serverDelete = (hostIp) => {
    console.log(hostIp);
  };
  serverUpdate = (record) => {
    console.log(record);
  };
  render() {
    const columns = [
      {
        title: "S码",
        dataIndex: "applicationId",
      },
      {
        title: "IP地址",
        dataIndex: "hostIp",
      },
      {
        title: "说明",
        dataIndex: "app",
      },
      {
        title: "补充说明",
        remarks: "cpuCore",
      },
      {
        title: "更新时间",
        dataIndex: "createTime",
      },
      {
        title: "操作",
        dataIndex: "hostIp",
        render: (text, row) => (
          <>
            <Button onClick={() => this.serverUpdate(row)}>
              更新
            </Button>
            <Button onClick={() => this.serverDelete(text)}>
              删除
            </Button>
          </>
        ),
      },
    ];
    return (
      <Table
        rowKey="hostIp"
        loading={this.state.loading}
        pagination={{
          defaultPageSize: 20,
          total: this.state.totalCount,
          showSizeChanger: false,
        }}
        dataSource={this.state.records}
        columns={columns}
      />
    );
  }
}
ServerManager.contextType = PanesContext;

export default ServerManager;
