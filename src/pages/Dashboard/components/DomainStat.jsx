import React, { Component } from "react";
import { Table } from "antd";
import PropTypes from "prop-types";
import * as echarts from "echarts";
export class DomainStat extends Component {
  componentDidUpdate() {
    this.topoChart();
  }
  componentDidMount() {
    this.myChart = echarts.init(document.getElementById("domainStat"));
    this.topoChart();
  }

  topoChart = () => {
    this.myChart.setOption({
      title: { text: "域名访问分析" },
      legend: {
        data: ["PV", "UV", "平均响应时间", "流量"],
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: this.props.createDate,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: this.props.pv,
          type: "line",
          name: "PV",
        },
        {
          data: this.props.uv,
          type: "line",
          name: "UV",
        },
        {
          data: this.props.avg,
          type: "line",
          name: "平均响应时间",
        },
        {
          data: this.props.sum,
          type: "line",
          name: "流量",
        },
      ],
    });
  };
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
      <>
        <Table
          rowKey="id"
          dataSource={this.props.domainStats}
          columns={columns}
        />
        <div id="domainStat" style={{ width: "100%", height: 300 }}></div>
      </>
    );
  }
}
DomainStat.propTypes = {
  domainStats: PropTypes.array,
  uv: PropTypes.array,
  pv: PropTypes.array,
  avg: PropTypes.array,
  sum: PropTypes.array,
  createDate: PropTypes.array,
};
export default DomainStat;
