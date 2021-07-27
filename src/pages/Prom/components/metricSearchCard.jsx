import React, { Component } from "react";
import { Form, Input, Button, DatePicker, Col } from "antd";
import PropTypes from "prop-types";

export class MetricSearchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchIp: "",
      applicationId: "",
      switch: "",
    };
  }

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
    console.log(fieldsValue);
    const fromDateChange =
      fieldsValue.fromDateChange === undefined
        ? ""
        : fieldsValue["fromDateChange"].format("YYYY-MM-DD");
    const toDateChange =
      fieldsValue.toDateChange === undefined
        ? ""
        : fieldsValue["toDateChange"].format("YYYY-MM-DD");
    console.log(fromDateChange, toDateChange);
    this.props.searchSubmit(
      this.state.searchIp,
      this.state.applicationId,
      fromDateChange,
      toDateChange
    );
  };

  render() {
    return (
      <Form
        name="basic"
        onFinish={this.formSubmit}
        layout="inline"
        size="large"
      >
        <Col span={5}>
          <Form.Item name="ipHost" label="服务器IP">
            <Input
              placeholder="多节点以逗号分隔"
              onChange={this.ipSearchChange}
              disabled={this.state.switch === "scodeSearch"}
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="sCode" label="项目S码">
            <Input
              placeholder="S码搜索"
              onChange={this.sCodeSearchChange}
              disabled={this.state.switch === "ipSearch"}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="fromDateChange" label="开始日期">
            <DatePicker placeholder="0点" onChange={this.fromDateChange} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="toDateChange" label="结束日期">
            <DatePicker placeholder="24点" onChange={this.toDateChange} />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Col>
        <Col span={2} offset={2}>
          <Form.Item>
            <Button onClick={this.props.download} type="primary">
              数据下载
            </Button>
          </Form.Item>
        </Col>
      </Form>
    );
  }
}
MetricSearchCard.propTypes = {
  searchSubmit: PropTypes.func,
  download: PropTypes.func,
};

export default MetricSearchCard;
