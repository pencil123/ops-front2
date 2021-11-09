import React, { Component } from "react";
import { Table } from "antd";
import PropTypes from "prop-types";
export class DomainStat extends Component {
  render() {
    const columns = [
      {
        title: "域名",
        dataIndex: "domain",
      },
      {
        title: "pv",
        dataIndex: "pv",
      },
      {
        title: "uv",
        dataIndex: "uv",
      },
      {
        title: "平均时间",
        dataIndex: "avgResponsetime",
      },
      {
        title: "流量",
        dataIndex: "sumSize",
      },
      {
        title: "日期",
        dataIndex: "createDate",
      },
    ];
    return (
      <Table
        rowKey="id"
        dataSource={this.props.domainStats}
        columns={columns}
      />
    );
  }
}
DomainStat.propTypes = {
  domainStats: PropTypes.object,
};
export default DomainStat;
