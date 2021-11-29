import React, { Component } from "react";
import PropTypes from "prop-types";
import { Descriptions, Row, Col, Empty } from "antd";
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
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
          name: "CPU",
        },
        {
          data: [110, 230, 224, 218, 135, 147, 260],
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
        <div id="nodestat" style={{ width: "100%", height: 550 }}></div>
        <Row>
          <Col span={8} style={{ height: 370 }}>
            {this.props.cpuUrlString ? (
              <iframe
                title="CPU"
                width="100%"
                height="370"
                sandbox="allow-scripts allow-forms allow-same-origin"
                src={this.props.cpuUrlString}
              ></iframe>
            ) : (
              <Empty description={<span>此项目不存在服务器节点数据</span>} />
            )}
          </Col>
          <Col span={8} style={{ height: 370 }}>
            {this.props.memUrlString ? (
              <iframe
                title="mem"
                width="100%"
                height="370"
                sandbox="allow-scripts allow-forms allow-same-origin"
                src={this.props.memUrlString}
              ></iframe>
            ) : (
              <Empty description={<span>此项目不存在服务器节点数据</span>} />
            )}
          </Col>
          <Col span={8} style={{ height: 370 }}>
            {this.props.diskUrlString ? (
              <iframe
                title="disk"
                width="100%"
                height="370"
                sandbox="allow-scripts allow-forms allow-same-origin"
                src={this.props.diskUrlString}
              ></iframe>
            ) : (
              <Empty description={<span>此项目不存在服务器节点数据</span>} />
            )}
          </Col>
        </Row>
      </>
    );
  }
}
NodeStat.propTypes = {
  sCodeRecord: PropTypes.object,
  cpuUrlString: PropTypes.string,
  diskUrlString: PropTypes.string,
  memUrlString: PropTypes.string,
};
export default NodeStat;
