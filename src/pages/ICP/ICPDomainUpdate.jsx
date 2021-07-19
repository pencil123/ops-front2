import React, { Component } from "react";
import { Card } from "antd";
const { Meta } = Card;
import { Form, Input, Button } from "antd";
export class ICPDomainUpdate extends Component {
  icpFromRef = React.createRef();
    state = {
    loading: false,
    ICPDomain: {},
  };

  componentDidMount() {
    this.setState(
      { ICPDomain: JSON.parse(localStorage.getItem("ICPDomainUpdate")) },
      () => {
        console.log(this.state.ICPDomain);
      }
    );
    this.icpFromRef.current.setFieldsValue({
        siteLicense:"hello world"
    })
  }
  render() {
    const onFinish = (values) => {
        console.log(this.icpFromRef.current.getFieldValue("domain"))
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const domainInfo = this.state.ICPDomain;
    return (
      <Card hoverable style={{ width: "50%", margin: "0 auto" }}>
        <Meta title="ICP 域名管理" />
        <Form
          ref={this.icpFromRef}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ siteLicense: domainInfo.siteLicense }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="域名管理" name="domain">
            <Input disabled={true} placeholder={this.state.ICPDomain.domain} />
          </Form.Item>

          <Form.Item label="备案公司" name="siteName">
            <Input disabled={true} placeholder={domainInfo.siteName} />
          </Form.Item>
          <Form.Item label="备案编号" name="siteLicense">
            <Input />
          </Form.Item>
          <Form.Item label="管理人" name="managerName">
            <Input defaultValue={this.state.ICPDomain.managerName} />
          </Form.Item>
          <Form.Item label="管理人工号" name="managerCode">
            <Input
              name="managerCode"
              defaultValue={this.state.ICPDomain.managerCode}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default ICPDomainUpdate;
