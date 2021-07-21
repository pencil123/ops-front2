import React, { Component } from "react";
import PropTypes from "prop-types";
// 引入 ECharts 主模块
import * as echarts from "echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

import { Symbol, Commons } from "./symbol";
export class Topology extends Component {
  componentDidUpdate() {
    this.topoChart();
  }
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById("main"));
    this.topoChart();
  }

  topoChart = () => {
    let newNodes = this.props.nodes.map(function (node) {
      if (node.type === "Redis") {
        return { ...node, symbol: Symbol.Redis, ...Commons };
      }
      if (node.type === "USER") {
        return { ...node, symbol: Symbol.USER, ...Commons };
      }
      if (node.type === "RocketMQ") {
        return { ...node, symbol: Symbol.RocketMQ, ...Commons };
      }
      if (node.type === "SpringMVC") {
        return { ...node, symbol: Symbol.SpringMVC, ...Commons };
      }
      if (node.type === "Tomcat") {
        return { ...node, symbol: Symbol.Tomcat, ...Commons };
      }
      if (node.type === "Mysql") {
        return { ...node, symbol: Symbol.Mysql, ...Commons };
      }
      if (node.type === "Unknown") {
        return { ...node, symbol: Symbol.Unknown, ...Commons };
      }
      if (node.type === "Kafka") {
        return { ...node, symbol: Symbol.Kafka, ...Commons };
      } else {
        return { ...node, ...Commons };
      }
    });
    // 绘制图表
    this.myChart.setOption({
      title: {
        text: this.props.title,
      },
      tooltip: {},
      animationDurationUpdate: 1500,
      animationEasingUpdate: "quinticInOut",
      series: [
        {
          type: "graph",
          layout: "force",
          force: {
            //力引导图基本配置
            initLayout: "circular", //力引导的初始化布局，默认使用xy轴的标点
            repulsion: 1000, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
            gravity: 0.01, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
            edgeLength: [10, 80], //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
            layoutAnimation: false,
            //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
            friction: 0.8,
          },
          symbolSize: 50,
          roam: true,
          label: {
            show: true,
          },
          edgeSymbol: ["circle", "arrow"],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            fontSize: 20,
          },
          data: newNodes,
          // links: [],
          links: this.props.calls,
          lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0.3,
          },
        },
      ],
    });
  };

  render() {
    return (
      <div
        id="main"
        className={this.props.title}
        style={{ width: "100%", height: 550 }}
      ></div>
    );
  }
}
Topology.propTypes = {
  title: PropTypes.string,
  calls: PropTypes.array,
  nodes: PropTypes.array,
};
export default Topology;
