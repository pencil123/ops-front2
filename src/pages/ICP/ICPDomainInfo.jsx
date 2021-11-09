import React, { Component } from "react";
import DomainInfoDesc from "./components/DomainInfoDesc";
import SubDomainList from "./components/SubDomainList";
import ICPCheckLog from "./components/ICPCheckLog";
import WebCheckLog from "./components/WebCheckLog";
import ManagerLog from "./components/ManagerLog";
import DomainAPI from "@/api/domain_api";
import IcpAPI from "@/api/icp_api";
import "./icp.less";
import { Tabs, Modal, Form, Input } from "antd";
const { TabPane } = Tabs;
export class ICPDomainInfo extends Component {
  icpFromRef = React.createRef();
  state = {
    loading: false,
    ICPDomain: {},
    subDomains: [],
    subDomainPageNum: 1,
    subDomainTotalPage: "",
    webLogs: [],
    webLogPageNum: 1,
    webLogTotalPage: "",
    icpLogs: [],
    icpLogPageNum: 1,
    icpLogTotalPage: "",
    adminLogs: [],
    adminLogPageNum: 1,
    adminLogTotalPage: "",
  };

  componentDidMount() {
    this.setState(
      { ICPDomain: JSON.parse(localStorage.getItem("ICPDomain")) },
      () => {
        this.callback("subDomain");
      }
    );
  }
  callback = async (key) => {
    if (key === "subDomain") {
      let subDomain = await DomainAPI.getSubDomain({
        domain: this.state.ICPDomain.domain,
        currentPage: this.state.subDomainPageNum,
      });
      this.setState({
        subDomains: subDomain.data.records,
        subDomainTotalCount: subDomain.data.totalCount,
      });
    } else if (key === "ICPlog") {
      let icpLogs = await IcpAPI.listlog({
        domain: this.state.ICPDomain.domain,
        targetType: 1,
        currentPage: this.state.icpLogPageNum,
      });
      this.setState({
        icpLogs: icpLogs.data.records,
        icpLogTotalCount: icpLogs.data.totalCount,
      });
    } else if (key === "webCheck") {
      let icpLogs = await IcpAPI.listlog({
        domain: this.state.ICPDomain.domain,
        targetType: 2,
        currentPage: this.state.webLogPageNum,
      });
      this.setState({
        webLogs: icpLogs.data.records,
        webLogTotalCount: icpLogs.data.totalCount,
      });
    } else if (key === "managerLog") {
      let adminLogs = await IcpAPI.listlog({
        domain: this.state.ICPDomain.domain,
        targetType: 3,
        currentPage: this.state.adminLogPageNum,
      });
      this.setState({
        adminLogs: adminLogs.data.records,
        adminLogTotalCount: adminLogs.data.totalCount,
      });
    }
  };
  pageTurn = (pageNum, from) => {
    console.log(pageNum, from);
    if (from === "subDomain")
      this.setState({ subDomainPageNum: pageNum }, () => {
        this.callback(from);
      });
    else if (from === "ICPlog")
      this.setState({ icpLogPageNum: pageNum }, () => {
        this.callback(from);
      });
    else if (from === "webCheck")
      this.setState({ webLogPageNum: pageNum }, () => {
        this.callback(from);
      });
    else if (from === "managerLog")
      this.setState({ adminLogPageNum: pageNum }, () => {
        this.callback(from);
      });
  };
  detectableState = () => {
    let detectable = this.state.ICPDomain.detectable === 1 ? 0 : 1;
    let data = Object.assign({}, this.state.ICPDomain, {
      detectable: detectable,
    });
    this.setState({ ICPDomain: data }, () => {
      let data = {
        domain: this.state.ICPDomain.domain,
        detectable: this.state.ICPDomain.detectable,
      };
      IcpAPI.detectable(data);
    });
  };

  ICPDomainUpdate = (DomainInfos) => {
    this.setState({ visible: true }, () => {
      this.icpFromRef.current.setFieldsValue({
        siteLicense: DomainInfos.siteLicense,
        domain: DomainInfos.domain,
        siteName: DomainInfos.siteName,
        managerName: DomainInfos.managerName,
        managerCode: DomainInfos.managerCode,
      });
    });
  };
  handleSubmit = async () => {
    await IcpAPI.update(this.icpFromRef.current.getFieldsValue());
    this.setState({ visible: false });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    return (
      <div>
        <Modal
          title="ICP 域名管理"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form
            ref={this.icpFromRef}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
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
          </Form>
        </Modal>

        <DomainInfoDesc
          domainInfo={this.state.ICPDomain}
          detectableState={this.detectableState}
          update={this.ICPDomainUpdate}
        />
        <Tabs
          defaultActiveKey="1"
          onChange={this.callback}
          className="ContentPadding"
        >
          <TabPane tab="二级域名" key="subDomain">
            <SubDomainList
              records={this.state.subDomains}
              totalCount={this.state.subDomainTotalCount}
              loading={this.state.loading}
              pageTurn={this.pageTurn}
            />
          </TabPane>
          <TabPane tab="ICP日志" key="ICPlog">
            <ICPCheckLog
              records={this.state.icpLogs}
              totalCount={this.state.icpLogTotalCount}
              loading={this.state.loading}
              pageTurn={this.pageTurn}
            />
          </TabPane>
          <TabPane tab="网站检测日志" key="webCheck">
            <WebCheckLog
              totalCount={this.state.webLogTotalCount}
              records={this.state.webLogs}
              loading={this.state.loading}
              pageTurn={this.pageTurn}
            />
          </TabPane>
          <TabPane tab="管理日志" key="managerLog">
            <ManagerLog
              totalCount={this.state.adminLogTotalCount}
              records={this.state.adminLogs}
              loading={this.state.loading}
              pageTurn={this.pageTurn}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ICPDomainInfo;
