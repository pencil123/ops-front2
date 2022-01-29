import React, { Component } from "react";
import { Table, PageHeader, Form, Modal, Input } from "antd";
import PropTypes from "prop-types";
import request from "@/utils/request";
export class GroupUserManage extends Component {
  state = {
    records: [],
    loading: false,
    userWithGrpAddShow: false,
    totalCount: 0,
    pageSize: 0,
    currentPage: 0,
    totalPage: 0,
    targetPage: 0,
    userWithGrpDelItem: "",
  };
  cancelModalFunc(object) {
    this.setState({ ...object });
  }
  UserWithGrpAddModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="用户组添加新成员"
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
          <Form.Item label="用户工号/用户ID" name="userId">
            <Input defaultValue="" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  render() {
    let UserWithGrpAddModal = this.UserWithGrpAddModal;
    const columns = [
      {
        title: "用户ID",
        dataIndex: "userCode",
      },
      {
        title: "姓名",
        dataIndex: "userName",
      },
      {
        title: "办公邮箱",
        dataIndex: "email",
      },
      {
        title: "操作",
        dataIndex: "userCode",
        render: (text, record) => (
          <button
            onClick={() => {
              this.setState({
                userWithGrpDelShow: true,
                userWithGrpDelItem: record,
              });
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
          title="移除用户组成员"
          visible={this.state.userWithGrpDelShow}
          onOk={this.handleDelSubmit}
          onCancel={(e) =>
            this.cancelModalFunc({ userWithGrpDelShow: false }, e)
          }
        >
          是否移除用户组成员： <b>{this.state.userWithGrpDelItem.userName}</b>？
        </Modal>
        <UserWithGrpAddModal
          visible={this.state.userWithGrpAddShow}
          onCreate={this.userWithGrpAddFunc}
          onCancel={(e) =>
            this.cancelModalFunc({ userWithGrpAddShow: false }, e)
          }
        />
        <PageHeader
          title={"【" + this.props.userGroupObj.grpName + "】 用户组成员管理"}
          subTitle="用户组中成员管理：查看、增加、删除！"
          style={{ width: "100%" }}
          extra={
            <button
              onClick={() => {
                this.setState({ userWithGrpAddShow: true });
              }}
            >
              添加新用户
            </button>
          }
        ></PageHeader>
        <Table
          className="ContentPadding"
          rowKey="id"
          onChange={this.userWithGrpPageChange}
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
  userWithGrpPageChange = (pageObj) => {
    this.setState({ targetPage: pageObj.current }, () => {
      this.getUserWithGroupInfo();
    });
  };
  handleDelSubmit = async () => {
    await request.post("/v1/user/userWithGroup/delGroupWithUser", {
      userId: this.state.userWithGrpDelItem.userCode,
      grpId: this.props.userGroupObj.grpId,
    });
    this.setState({ userWithGrpDelShow: false });
    this.getUserWithGroupInfo();
  };
  userWithGrpAddFunc = async (values) => {
    try {
      await request.post("/v1/user/userWithGroup/addGroupWithUser", {
        grpId: this.props.userGroupObj.grpId,
        ...values,
      });
      this.setState({ userWithGrpAddShow: false });
      this.getUserWithGroupInfo();
    } catch (error) {
      this.setState({ userWithGrpAddShow: false });
    }
  };
  getUserWithGroupInfo = async () => {
    let res = await request.get("/v1/user/userWithGroup/pageGroupWithUser", {
      pageSize: 10,
      currentPage: this.state.targetPage,
      grpId: this.props.userGroupObj.grpId,
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
    this.getUserWithGroupInfo();
  }
}

GroupUserManage.propTypes = {
  userGroupObj: PropTypes.object,
};

export default GroupUserManage;
