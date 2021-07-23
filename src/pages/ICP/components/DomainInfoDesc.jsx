import React, { Component } from "react";
import { Descriptions } from "antd";
import PropTypes from "prop-types";
import { Switch, PageHeader } from "antd";

export class DomainInfoDesc extends Component {
  state = {
    ICPDomain: {},
  };
  webStatus = (record) => {
    let httpType = {
      http: "http://",
      httpw: "http://www.",
      https: "https://",
      httpsw: "https://www.",
    };
    let result = "";
    for (let httptype in httpType) {
      if (record[httptype] === 0) {
        result = `${result}<a style="color:#000000;padding:5px;font-weight:bold" target='_blank' href=${httpType[httptype]}${record.domain}>${httptype}</a>`;
      } else if (record[httptype] === 1) {
        result = `${result}<a style="color:#cf1322;padding:5px;font-weight:bold" target='_blank' href=${httpType[httptype]}${record.domain}>${httptype}</a>`;
      } else if (record[httptype] === 2) {
        result = `${result}<a style="color:#096dd9;padding:5px;font-weight:bold" target='_blank'  href=${httpType[httptype]}${record.domain}>${httptype}</a>`;
      }
    }
    return { __html: result };
  };

  render() {
    const domainInfo = this.props.domainInfo;
    return (
      <PageHeader
        title={"域名 " + domainInfo.domain + " 详情"}
        style={{ width: "100%" }}
        className="ICPDescCard"
        extra={
          <div className="sCodeSelect">
            <Switch
              defaultChecked
              checkedChildren="检查"
              unCheckedChildren="关闭"
              onChange={this.props.detectableState}
              style={{ marginTop: 7 }}
            />
            <button onClick={() => this.props.update(this.props.domainInfo)}>
              更新
            </button>
          </div>
        }
      >
        <Descriptions bordered>
          <Descriptions.Item label="公司">
            {domainInfo.siteName}
          </Descriptions.Item>
          <Descriptions.Item label="ICP备案编号">
            {domainInfo.siteLicense}
          </Descriptions.Item>
          <Descriptions.Item label="ICP备案公司">
            {domainInfo.companyName}
          </Descriptions.Item>
          <Descriptions.Item label="ICP更新时间">
            {domainInfo.verifyTime}
          </Descriptions.Item>
          <Descriptions.Item label="网站管理人">
            {" "}
            {domainInfo.managerName}
          </Descriptions.Item>
          <Descriptions.Item label="网站管理工号">
            {domainInfo.managerCode}
          </Descriptions.Item>
          <Descriptions.Item label="信息创建时间">
            {domainInfo.createTime}
          </Descriptions.Item>
          <Descriptions.Item label="最近更新时间">
            {domainInfo.updateTime}
          </Descriptions.Item>
          <Descriptions.Item label="网站状态">
            <div dangerouslySetInnerHTML={this.webStatus(domainInfo)}></div>
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    );
  }
}
DomainInfoDesc.propTypes = {
  domainInfo: PropTypes.object,
  detectableState: PropTypes.func,
  update: PropTypes.func,
};
export default DomainInfoDesc;
