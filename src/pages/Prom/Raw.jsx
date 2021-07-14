import React, { Component } from "react";
import { Row, Col, Form, Input, Button, DatePicker } from "antd";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export class Raw extends Component {
  render() {
    return (
      <>
        <Row id="SearchTab">
          <Col>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="inline"
              size="large"
            >
              <Form.Item name="ipHost">
                <Input placeholder="IP搜索/多节点以逗号分隔" />
              </Form.Item>
              <Form.Item name="sCode">
                <Input placeholder="S码搜索" />
              </Form.Item>
              <Form.Item name="date-picker" >
                <DatePicker placeholder="开始日期（0点）" />
              </Form.Item>
              <Form.Item name="date-picker" >
                <DatePicker placeholder="结束日期（24点）" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

export default Raw;
