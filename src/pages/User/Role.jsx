import React, { Component } from "react";
import { Table, PageHeader, Modal, Form, Input } from "antd";
import UserAPI from "@/api/user";
export class Role extends Component {
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
    let result = await UserAPI.listRoles();
    this.setState({
      records: result,
    });
  };
  addUsertoRole = (roleId) => {
    this.setState({ visibleDel: true, delRoleId: roleId });
  };
  roleUserList = (roleId) => {
    this.setState({ visibleDel: true, delRoleId: roleId });
  };
  managerDelete = (roleId) => {
    this.setState({ visibleDel: true, delRoleId: roleId });
  };
  handleDelCancel = () => {
    this.setState({ visibleDel: false });
  };
  handleDelSubmit = async () => {
    await UserAPI.delRolebyId({ roleId: this.state.delRoleId });
    this.setState({ visibleDel: false });
    this.initData();
  };
  handleAddCancel = () => {
    this.setState({ visibleAdd: false });
  };
  handleAddSubmit = async () => {
    await UserAPI.addRole(this.managerFromRef.current.getFieldsValue());
    this.setState({ visibleAdd: false });
    this.initData();
  };
  render() {
    const columns = [
      {
        title: "角色名",
        dataIndex: "roleName",
      },
      {
        title: "角色Key",
        dataIndex: "roleKey",
      },
      {
        title: "创建人",
        dataIndex: "createBy",
      },
      {
        title: "状态",
        dataIndex: "status",
      },
      {
        title: "操作",
        dataIndex: "roleId",
        render: (text) => (
          <>
            <button
              onClick={() => {
                this.managerDelete(text);
              }}
            >
              删除
            </button>
            <button
              onClick={() => {
                this.roleUserList(text);
              }}
            >
              查看成员
            </button>
            <button
              onClick={() => {
                this.addUsertoRole(text);
              }}
            >
              添加成员
            </button>
          </>
        ),
      },
    ];
    return (
      <>
        <Modal
          title="展示成员信息"
          visible={this.state.visibleList}
          onCancel={this.handleDelCancel}
        >
          暂未实现
        </Modal>
        <Modal
          title="角色删除"
          visible={this.state.visibleDel}
          onOk={this.handleDelSubmit}
          onCancel={this.handleDelCancel}
        >
          是否要删除角色： <b>{this.state.delRoleId}</b>？
        </Modal>
        <Modal
          title="添加新角色"
          visible={this.state.visibleAdd}
          onOk={this.handleAddSubmit}
          onCancel={this.handleAddCancel}
        >
          <Form
            ref={this.managerFromRef}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label="角色名" name="roleName">
              <Input />
            </Form.Item>
            <Form.Item label="角色Key" name="roleKey">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <PageHeader
          title="角色列表"
          subTitle="管理员可以管理角色信息"
          style={{ width: "100%" }}
          extra={
            <button
              onClick={() => {
                this.setState({ visibleAdd: true });
              }}
            >
              添加新角色
            </button>
          }
        ></PageHeader>
        <Table
          className="ContentPadding"
          rowKey="roleId"
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

export default Role;
