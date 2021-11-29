import React, { Component } from "react";
import { Row, Col, PageHeader } from "antd";
import MetricAPI from "@/api/metric_api";
import MetricSearchCard from "./components/metricSearchCard";
import MetricListTable from "./components/metricListTable";

export class AnalysedMetricData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      totalCount: "",
      err: "",
      pageNum: 1,
      loading: false,
    };
  }
  componentDidMount() {
    this.initData();
  }

  initData = async () => {
    this.setState({ loading: true });
    let data = {
      currentPage: this.state.pageNum,
      hostIpArray: this.state.searchIp,
      endTime: this.state.targetToDate,
      beginTime: this.state.targetFromDate,
      appCode: this.state.appCode,
    };
    let result = await MetricAPI.metricCollectList(data);
    this.setState({
      records: result.data.records,
      totalCount: result.data.totalCount,
      loading: false,
    });
  };

  pageTurn = (pageTrunObj) => {
    this.setState({ pageNum: pageTrunObj.current }, () => {
      this.initData();
    });
  };

  searchSubmit = (searchIp, appCode, targetFromDate, targetToDate) => {
    this.setState(
      { searchIp, appCode, targetFromDate, targetToDate, pageNum: 1 },
      () => {
        this.initData();
      }
    );
  };
  download = async () => {
    let filename = "效能聚合数据";
    let data = {
      hostIpArray: this.state.searchIp,
      appCode: this.state.appCode,
      beginTime: this.state.targetFromDate,
      endTime: this.state.targetToDate,
    };
    let res = await MetricAPI.collectExport(data);
    try {
      let blob = new Blob([res]);
      console.log("blob:", res);
      let downloadElement = document.createElement("a");
      let href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      downloadElement.download = filename + ".xlsx"; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放blob对象
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <>
        <Row id="SearchTab">
          <PageHeader
            title="服务器指标数据搜索"
            subTitle="搜索条件中服务器IP和S码同时只能选择一个"
            style={{ width: "100%" }}
          >
            <Col>
              <MetricSearchCard
                searchSubmit={this.searchSubmit}
                download={this.download}
              />
            </Col>
          </PageHeader>
        </Row>
        <Row id="MetricTable">
          <Col>
            <MetricListTable
              current={this.state.pageNum}
              metricType="AnalysedMetric"
              loading={this.state.loading}
              records={this.state.records}
              totalCount={this.state.totalCount}
              pageTurn={this.pageTurn}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default AnalysedMetricData;
