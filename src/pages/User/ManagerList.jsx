import React, { Component } from "react";
import { Table, Modal } from "antd";
import AdminAPI from "@/api/admin_api";
export class ManagerList extends Component {
  state = {
    visibleDel: false,
    currentPage: "",
    records: [],
    err: "",
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
    this.setState({ visible: true, delUserCode: userCode });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleSubmit = async () => {
    await AdminAPI.adminDelete({ userCode: this.state.delUserCode });
    this.setState({ visible: false });
    this.initData();
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
      <>
        <Modal
          title="管理员账号删除"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          是否要删除管理员账号： <b>{this.state.delUserCode}</b>？
        </Modal>
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
      </>
    );
  }
}

export default ManagerList;
