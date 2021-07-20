import React, { Component } from "react";
import { Card, Modal, Form, Input, Button } from "antd";
const { Meta } = Card;
import IcpAPI from "@/api/icp_api";
export class ICPDomainUpdate extends Component {
  icpFromRef = React.createRef();
  state = {
    visible: false,
  };
  componentDidMount() {
    const IcpDomainInfo = JSON.parse(localStorage.getItem("ICPDomainUpdate"));
    this.icpFromRef.current.setFieldsValue({
      siteLicense: IcpDomainInfo.siteLicense,
      domain: IcpDomainInfo.domain,
      siteName: IcpDomainInfo.siteName,
      managerName: IcpDomainInfo.managerName,
      managerCode: IcpDomainInfo.managerCode,
    });
  }
  onFinish =  () => {
    this.setState({visible:true})
  };
  handleSubmit = async() => {
      await IcpAPI.update(this.icpFromRef.current.getFieldsValue())
      this.setState({visible:false})
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <>
        <Modal
          title="提交更新"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
            是否要提交更新内容？
        </Modal>
        <Card hoverable style={{ width: "50%", margin: "0 auto" }}>
          <Meta title="ICP 域名管理" />
          <Form
            ref={this.icpFromRef}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={this.onFinish}
          >
            <Form.Item label="域名管理" name="domain">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item label="备案公司" name="siteName">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item label="备案编号" name="siteLicense">
              <Input />
            </Form.Item>
            <Form.Item label="管理人" name="managerName">
              <Input />
            </Form.Item>
            <Form.Item label="管理人工号" name="managerCode">
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </>
    );
  }
}

export default ICPDomainUpdate;
