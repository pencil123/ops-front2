import React, { Component } from "react";
import { Table } from "antd";
import AdminAPI from "@/api/admin_api";
export class ManagerList extends Component {
  state = {
    show: false,
    setShow: false,
    currentPage: "",
    records: [],
    totalPage: "",
    delUser: "",
    err: "",
    searchIp: "",
  };
  componentDidMount() {
    this.initData();
  }

  initData = async () => {
    let result = await AdminAPI.adminList();
    this.setState({
      records: result.data.records,
      totalCount: result.data.totalCount,
    });
  };
  managerDelete = (userCode) => {
    console.log(userCode);
  };
  render() {
    const columns = [
      {
        title: "工号",
        dataIndex: "userCode",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
      },
      {
        title: "操作",
        dataIndex: "userCode",
        render: (text) => (
          <button
            onClick={() => {
              this.managerDelete(text);
            }}
          >
            删除
          </button>
        ),
      },
    ];
    return (
      <Table
        rowKey="userCode"
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

export default ManagerList;
