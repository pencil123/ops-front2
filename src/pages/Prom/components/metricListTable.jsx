import React, { Component } from "react";
import { Table} from "antd";

const columns = [
  {
    title: 'IP地址',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '应用名称',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'S码',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'CPU核数',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'CPU峰值(%)',
    key: 'action',
  },{
    title: 'CPU均值(%)',
    key: 'action',
  },{
    title: '内存容量(G)',
    key: 'action',
  },{
    title: '内存峰值(%)',
    key: 'action',
  },{
    title: '内存均值(%)',
    key: 'action',
  },{
    title: '磁盘读速率(MB/s))',
    key: 'action',
  },{
    title: '磁盘写速率(MB/s)',
    key: 'action',
  },{
    title: '磁盘读延时(ms)',
    key: 'action',
  },{
    title: '磁盘写延时(ms)',
    key: 'action',
  },{
    title: '网络上行带宽(MB/s)',
    key: 'action',
  },{
    title: '网络下行带宽(MB/s)',
    key: 'action',
  },{
    title: '取数时间',
    key: 'action',
  }
];

const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export class MetricListTable extends Component {
  render() {
    return (
      <Table dataSource={data} columns={columns} />
      );
  }
}

export default MetricListTable;
