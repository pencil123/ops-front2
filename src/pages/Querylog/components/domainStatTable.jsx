import React, { Component } from "react";
import { Table } from "antd";
import PropTypes from "prop-types";

export class DomainStatTable extends Component {
  state = {
    columns: [],
  };
  render() {
    const commonCols = [
      {
        title: "域名",
        dataIndex: "domain",
      },
      {
        title: "S码",
        dataIndex: "appCode",
      },
      {
        title: "应用名",
        dataIndex: "appName",
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
        title: "平均响应时间",
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
        onChange={this.props.pageTurn}
        loading={this.props.loading}
        pagination={{
          current: this.props.current,
          defaultPageSize: 20,
          total: this.props.totalCount,
          showSizeChanger: false,
        }}
        dataSource={this.props.records}
        columns={commonCols}
      />
    );
  }
}

DomainStatTable.propTypes = {
  pageTurn: PropTypes.func,
  totalCount: PropTypes.number,
  records: PropTypes.array,
  loading: PropTypes.bool,
  metricType: PropTypes.string,
  current: PropTypes.number,
};
export default DomainStatTable;
