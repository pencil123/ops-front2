import React, { Component } from "react";
import NodeAPI from "@/api/node_api";
import { Table, Button, PageHeader } from "antd";
import { Form, Modal, Input } from "antd";
import { PanesContext } from "@/context/Panes";

export class ServerManager extends Component {
  ServerUpdateRef = React.createRef();
  state = {
    loading: false,
    hostIp: "",
    applicationId: "",
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
      applicationId: this.state.applicationId,
    };
    let result = await NodeAPI.nodeList(data);
    this.setState({
      records: result.data.records,
      totalCount: result.data.totalCount,
      loading: false,
    });
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
    this.setState({ applicationId: event.target.value });
  };

  formSubmit = (fieldsValue) => {
    this.setState(
      {
        hostIp: fieldsValue.hostIp,
        applicationId: fieldsValue.applicationId,
        pageNum: 1,
      },
      () => {
        this.initData();
      }
    );
  };
  serverDelete = (hostIp) => {
    this.setState({ visibleDel: true, deleteServer: hostIp });
  };
  handleSubmit = async () => {
    await NodeAPI.nodeDelete({ hostIp: this.state.deleteServer });
    this.setState({ visibleDel: false });
    this.initData();
  };
  handleCancel = () => {
    this.setState({ visibleDel: false });
  };
  serverUpdate = (record) => {
    this.setState({ visibleUpdate: true }, () => {
      this.ServerUpdateRef.current.setFieldsValue({
        hostIp: record.hostIp,
        app: record.app,
        remarks: record.remarks,
      });
    });
  };
  handleSubmit2 = async () => {
    console.log(this.ServerUpdateRef.current.getFieldsValue());
    await NodeAPI.update(this.ServerUpdateRef.current.getFieldsValue());
    this.setState({ visibleUpdate: false }, () => {
      this.initData();
    });
  };
  handleCancel2 = () => {
    this.setState({ visibleUpdate: false });
  };
  render() {
    const columns = [
      {
        title: "S???",
        dataIndex: "applicationId",
      },
      {
        title: "IP??????",
        dataIndex: "hostIp",
      },
      {
        title: "??????",
        dataIndex: "app",
      },
      {
        title: "????????????",
        remarks: "cpuCore",
      },
      {
        title: "????????????",
        dataIndex: "createTime",
      },
      {
        title: "??????",
        dataIndex: "hostIp",
        render: (text, row) => (
          <>
            <Button onClick={() => this.serverUpdate(row)}>??????</Button>
            <Button onClick={() => this.serverDelete(text)}>??????</Button>
          </>
        ),
      },
    ];
    return (
      <>
        <Modal
          title="????????????"
          visible={this.state.visibleDel}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          ??????????????? <b>{this.state.deleteServer}</b>?????????
        </Modal>
        <Modal
          title="??????????????????"
          visible={this.state.visibleUpdate}
          onOk={this.handleSubmit2}
          onCancel={this.handleCancel2}
        >
          <Form
            ref={this.ServerUpdateRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item label="IP??????" name="hostIp">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item label="????????????" name="app">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item label="??????" name="remarks">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <PageHeader
          title="???????????????"
          subTitle="????????????????????????IP???S???????????????????????????"
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
                  placeholder="IP??????/????????????????????????"
                  onChange={this.ipSearchChange}
                  disabled={this.state.switch === "scodeSearch"}
                />
              </Form.Item>
              <Form.Item name="applicationId">
                <Input
                  placeholder="S?????????"
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
