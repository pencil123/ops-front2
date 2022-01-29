import React, { Component } from "react";
import { Table, Modal, PageHeader, Form, Input } from "antd";
import request from "@/utils/request";

export class UserGroupManager extends Component {
  state = {
    records: [],
    loading: false,
    userGrpAddShow: false,
    totalCount: 0,
    pageSize: 0,
    currentPage: 0,
    totalPage: 0,
    targetPage: 0,
    userGrpDelItem: "",
  };
  cancelModalFunc(object) {
    this.setState({ ...object });
  }

  UserGrpAddModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="添加新的管理员"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item label="用户组名" name="grpName">
            <Input defaultValue="" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  render() {
    let UserGrpAddModal = this.UserGrpAddModal;
    const columns = [
      {
        title: "用户组名",
        dataIndex: "grpName",
      },
      {
        title: "创建人",
        dataIndex: "createUserNo",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
      },
      {
        title: "更新时间",
        dataIndex: "updateTime",
      },
      {
        title: "操作",
        dataIndex: "grpId",
        render: (text, record) => (
          <button
            onClick={() => {
              this.setState({ userGrpDelShow: true, userGrpDelItem: record });
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
          title="用户组删除"
          visible={this.state.userGrpDelShow}
          onOk={this.handleDelSubmit}
          onCancel={(e) => this.cancelModalFunc({ userGrpDelShow: false }, e)}
        >
          是否要删除用户组： <b>{this.state.userGrpDelItem.grpName}</b>？
        </Modal>
        <UserGrpAddModal
          visible={this.state.userGrpAddShow}
          onCreate={this.userGrpAddFunc}
          onCancel={(e) => this.cancelModalFunc({ userGrpAddShow: false }, e)}
        />
        <PageHeader
          title="用户组管理"
          subTitle="每个用户都可以创建自己独立的用户组。"
          style={{ width: "100%" }}
          extra={
            <button
              onClick={() => {
                this.setState({ userGrpAddShow: true });
              }}
            >
              添加用户分组
            </button>
          }
        ></PageHeader>
        <Table
          className="ContentPadding"
          rowKey="grpId"
          onChange={this.userGrpPageChange}
          loading={this.state.loading}
          pagination={{
            pageSize: this.state.pageSize,
            showSizeChanger: false,
            current: this.state.currentPage,
            total: this.state.totalCount,
          }}
          dataSource={this.state.records}
          columns={columns}
        />
      </>
    );
  }
  userGrpPageChange = (pageObj) => {
    this.setState({ targetPage: pageObj.current }, () => {
      this.getGroupInfo();
    });
  };
  handleDelSubmit = async () => {
    await request.post("/v1/user/group/delUserGroupById", {
      grpId: this.state.userGrpDelItem.grpId,
    });
    this.setState({ userGrpDelShow: false });
    this.getGroupInfo();
  };
  userGrpAddFunc = async (values) => {
    await request.post("/v1/user/group/addUserGroup", values);
    this.setState({ userGrpAddShow: false });
    this.getGroupInfo();
  };
  getGroupInfo = async () => {
    let res = await request.get("/v1/user/group/pageUserGroups", {
      pageSize: 10,
      currentPage: this.state.targetPage,
    });
    this.setState({
      records: res.records,
      totalCount: res.totalCount,
      pageSize: res.pageSize,
      currentPage: res.currentPage,
      totalPage: res.totalPage,
    });
  };
  componentDidMount() {
    this.getGroupInfo();
  }
}

export default UserGroupManager;
