import React, { Component } from "react";
import { Table } from "antd";

const columns = [
  {
    title: "IP地址",
    dataIndex: "hostIp",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "应用名称",
    dataIndex: "app",
  },
  {
    title: "S码",
    dataIndex: "applicationId",
  },
  {
    title: "CPU核数",
    dataIndex: "cpuCore",
  },
  {
    title: "CPU峰值(%)",
    dataIndex: "cpuMaxUsage",
  },
  {
    title: "CPU均值(%)",
    dataIndex: "cpuAvgUsage",
  },
  {
    title: "内存容量(G)",
    dataIndex: "memoryTotal",
  },
  {
    title: "内存峰值(%)",
    dataIndex: "memoryMaxUsage",
  },
  {
    title: "内存均值(%)",
    dataIndex: "memoryAvgUsage",
  },
  {
    title: "磁盘读速率(MB/s))",
    dataIndex: "diskRead",
  },
  {
    title: "磁盘写速率(MB/s)",
    dataIndex: "diskWritten",
  },
  {
    title: "磁盘读延时(ms)",
    dataIndex: "diskReadDelay",
  },
  {
    title: "磁盘写延时(ms)",
    dataIndex: "diskWrittenDelay",
  },
  {
    title: "网络上行带宽(MB/s)",
    dataIndex: "networkReceive",
  },
  {
    title: "网络下行带宽(MB/s)",
    dataIndex: "networkTransmit",
  },
  {
    title: "取数时间",
    dataIndex: "createTime",
  },
];

export class MetricListTable extends Component {
  onChange = (page) => {
    console.log(page);
  };

  render() {
    return (
      <Table
        rowKey="hostIp"
        onChange={this.props.pageTurn}
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

export default MetricListTable;
