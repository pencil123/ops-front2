import React, { Component } from "react";
import { Card, Form, Input, Button } from "antd";
const { Meta } = Card;
import AdminAPI from '@/api/admin_api';
export class ManagerAdd extends Component {
  state = {
    visible: false,
  };
  onFinish= async (fieldsValue)=>{
      await AdminAPI.adminAdd({userCode:fieldsValue.userCode})
      
  }
  render() {
    return (
        <Card hoverable style={{ width: "50%", margin: "0 auto" }}>
          <Meta title="添加管理员账号" />
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={this.onFinish}
          >
            <Form.Item label="用户ID/工号" name="userCode">
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 19, span: 5 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
    );
  }
}

export default ManagerAdd;
