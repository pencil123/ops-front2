import React, { Component } from "react";
import { Descriptions } from "antd";
import PropTypes from "prop-types";

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
        result = `${result}<a class='text-secondary' target='_blank' href=${httpType[httptype]}${record.domain}>${httptype}</a>`;
      } else if (record[httptype] === 1) {
        result = `${result}<a class='text-danger' target='_blank' href=${httpType[httptype]}${record.domain}>${httptype}</a>`;
      } else if (record[httptype] === 2) {
        result = `${result}<a class='text-primary' target='_blank'  href=${httpType[httptype]}${record.domain}>${httptype}</a>`;
      }
    }
    return { __html: result };
  };
  render() {
    const domainInfo = this.props.domainInfo;
    return (
      <Descriptions title="域名 详情" bordered>
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
    );
  }
}
DomainInfoDesc.propTypes = {
  domainInfo: PropTypes.string,
};
export default DomainInfoDesc;
