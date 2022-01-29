import React, { Component } from "react";
import { Table, Modal, Form, Input, PageHeader } from "antd";
import AdminAPI from "@/api/admin_api";
export class ManagerList extends Component {
  managerFromRef = React.createRef();
  state = {
    visibleDel: false,
    visibleAdd: false,
    currentPage: "",
    records: [],
    err: "",
  };
  componentDidMount() {
    this.initData();
  }
  initData = async () => {
    let result = await AdminAPI.getUsersByRoleKey({ roleKey: "admin" });
    console.log("响应数据：" + result.data);
    this.setState({
      records: result.data,
    });
  };
  managerDelete = (userCode) => {
    this.setState({ visibleDel: true, delUserCode: userCode });
  };
  handleDelCancel = () => {
    this.setState({ visibleDel: false });
  };
  handleDelSubmit = async () => {
    await AdminAPI.adminDelete({ userCode: this.state.delUserCode });
    this.setState({ visibleDel: false });
    this.initData();
  };
  handleAddCancel = () => {
    this.setState({ visibleAdd: false });
  };
  handleAddSubmit = async () => {
    await AdminAPI.adminAdd(this.managerFromRef.current.getFieldsValue());
    this.setState({ visibleAdd: false });
    this.initData();
  };
  render() {
    const columns = [
      {
        title: "工号",
        dataIndex: "userCode",
      },
      {
        title: "姓名",
        dataIndex: "userName",
      },
      {
        title: "所属部门",
        dataIndex: "deptName",
      },
      {
        title: "状态（正常：1）",
        dataIndex: "status",
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
          visible={this.state.visibleDel}
          onOk={this.handleDelSubmit}
          onCancel={this.handleDelCancel}
        >
          是否要删除管理员账号： <b>{this.state.delUserCode}</b>？
        </Modal>
        <Modal
          title="添加新的管理员"
          visible={this.state.visibleAdd}
          onOk={this.handleAddSubmit}
          onCancel={this.handleAddCancel}
        >
          <Form
            ref={this.managerFromRef}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label="用户ID/工号" name="userCode">
              <Input />
            </Form.Item>
            <Form.Item
              label="Role"
              name="roleId"
              hidden
              initialValue={1}
            ></Form.Item>
          </Form>
        </Modal>
        <PageHeader
          title="管理员列表"
          subTitle="系统管理员权限独立，不和其他系统相关"
          style={{ width: "100%" }}
          extra={
            <button
              onClick={() => {
                this.setState({ visibleAdd: true });
              }}
            >
              添加管理员
            </button>
          }
        ></PageHeader>
        <Table
          className="ContentPadding"
          rowKey="userCode"
          loading={this.state.loading}
          pagination={{
            defaultPageSize: 20,
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
