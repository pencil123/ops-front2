import React, { Component } from "react";
import { Table } from "antd";
import HostMetricDetails from "../HostMetricDetails";
import { PanesContext } from "@/context/Panes";
import PropTypes from "prop-types";

export class MetricListTable extends Component {
  state = {
    columns: [],
  };
  /**
   * 添加标签页
   */
  addPane(hostIp) {
    const panes = this.context.panes.slice();
    const activeMenu = hostIp;
    //如果标签页不存在就添加一个
    if (!panes.find((i) => i.key === activeMenu)) {
      localStorage.setItem("hostMetric", hostIp);
      panes.push({
        name: "节点指标",
        key: hostIp,
        content: <HostMetricDetails />,
      });
    }
    this.context.updateState({ panes, activeMenu });
  }

  componentDidMount() {
    const commonCols = [
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
    ];

    const AllMetricBefore = [
      {
        title: "IP地址",
        dataIndex: "hostIp",
        render: (text) => (
          <span
            onClick={() => this.addPane(text)}
            style={{ cursor: "pointer", color: "#0056b3" }}
          >
            {text}
          </span>
        ),
      },
      {
        title: "应用名称",
        dataIndex: "app",
      },
      {
        title: "S码",
        dataIndex: "applicationId",
      },
    ];
    const MetricCreateTime = [
      {
        title: "取数时间",
        dataIndex: "createTime",
      },
    ];
    const columns = [];
    if (this.props.metricType === "allMetric") {
      columns.push(...AllMetricBefore, ...commonCols, ...MetricCreateTime);
    } else if (this.props.metricType === "AnalysedMetric") {
      columns.push(...AllMetricBefore, ...commonCols);
    } else {
      columns.push(...MetricCreateTime, ...commonCols);
    }
    this.setState({ columns });
  }

  render() {
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
        columns={this.state.columns}
      />
    );
  }
}

MetricListTable.contextType = PanesContext;

MetricListTable.propTypes = {
  pageTurn: PropTypes.func,
  totalCount: PropTypes.number,
  records: PropTypes.array,
  loading: PropTypes.bool,
  metricType: PropTypes.string,
  current: PropTypes.number,
};
export default MetricListTable;
