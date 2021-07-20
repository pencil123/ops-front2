import React, { Component } from "react";
import { Table } from "antd";
import PropTypes from "prop-types";

export class ICPCheckLog extends Component {
  MypageTurn = (pageTrunObj) => {
    this.props.pageTurn(pageTrunObj.current, "ICPlog");
  };
  render() {
    const columns = [
      {
        title: "域名",
        dataIndex: "targetObj",
      },
      {
        title: "时间",
        dataIndex: "createTime",
      },
      {
        title: "消息",
        dataIndex: "info",
      },
    ];
    return (
      <Table
        rowKey="id"
        onChange={this.MypageTurn}
        loading={this.props.loading}
        pagination={{
          defaultPageSize: 20,
          total: this.props.totalCount,
          showSizeChanger: false,
        }}
        dataSource={this.props.records}
        columns={columns}
      />
    );
  }
}

ICPCheckLog.propTypes = {
  pageTurn: PropTypes.func,
  records: PropTypes.array,
  totalCount: PropTypes.number,
  loading: PropTypes.bool,
};

export default ICPCheckLog;
