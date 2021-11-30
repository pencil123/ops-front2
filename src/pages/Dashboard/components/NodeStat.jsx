import React, { Component } from "react";
import PropTypes from "prop-types";
import { Descriptions } from "antd";
import * as echarts from "echarts";

export class NodeStat extends Component {
  componentDidUpdate() {
    this.topoChart();
  }
  componentDidMount() {
    this.myChart = echarts.init(document.getElementById("nodestat"));
    this.topoChart();
  }

  topoChart = () => {
    console.log("memlist", this.props.memList);
    this.myChart.setOption({
      title: { text: "CPU和内存使用率" },
      legend: {
        data: ["CPU", "MEM"],
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: this.props.createtime,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: this.props.cpuList,
          type: "line",
          name: "CPU",
        },
        {
          data: this.props.memList,
          type: "line",
          name: "MEM",
        },
      ],
    });
  };

  render() {
    return (
      <>
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="CPU负载高">
            {this.props.sCodeRecord.cpuHighUsage}
          </Descriptions.Item>
          <Descriptions.Item label="CPU负载正常">
            {this.props.sCodeRecord.cpuNormalUsage}
          </Descriptions.Item>
          <Descriptions.Item label="CPU负载低">
            {this.props.sCodeRecord.cpuLowUsage}
          </Descriptions.Item>
          <Descriptions.Item label="内存负载高">
            {this.props.sCodeRecord.memoryHighUsage}
          </Descriptions.Item>
          <Descriptions.Item label="内存负载正常">
            {this.props.sCodeRecord.memoryNormalUsage}
          </Descriptions.Item>
          <Descriptions.Item label="内存负载低">
            {this.props.sCodeRecord.memoryLowUsage}
          </Descriptions.Item>
        </Descriptions>
        <div id="nodestat" style={{ width: "100%", height: 300 }}></div>
      </>
    );
  }
}
NodeStat.propTypes = {
  sCodeRecord: PropTypes.object,
  memList: PropTypes.array,
  cpuList: PropTypes.array,
  createtime: PropTypes.array,
};
export default NodeStat;
