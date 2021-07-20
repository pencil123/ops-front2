import React, { Component } from "react";
import NodeAPI from "@/api/node_api";
import { Table, Button } from "antd";
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
      { hostIp: fieldsValue.hostIp, applicationId: fieldsValue.applicationId },
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
            <Button onClick={() => this.serverUpdate(row)}>更新</Button>
            <Button onClick={() => this.serverDelete(text)}>删除</Button>
          </>
        ),
      },
    ];
    return (
      <>
        <Modal
          title="删除节点"
          visible={this.state.visibleDel}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          是否要删除 <b>{this.state.deleteServer}</b>节点？
        </Modal>
        <Modal
          title="节点信息更新"
          visible={this.state.visibleUpdate}
          onOk={this.handleSubmit2}
          onCancel={this.handleCancel2}
        >
          <Form
            ref={this.ServerUpdateRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item label="IP地址" name="hostIp">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item label="节点说明" name="app">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item label="补充" name="remarks">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
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
          <Form.Item name="applicationId">
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
        <Table
          rowKey="hostIp"
          onChange={this.pageTurn}
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
ServerManager.contextType = PanesContext;

export default ServerManager;
