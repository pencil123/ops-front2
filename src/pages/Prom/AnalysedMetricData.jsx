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
      hostIp: this.state.searchIp,
      endTime: this.state.targetToDate,
      beginTime: this.state.targetFromDate,
      applicationId: this.state.applicationId,
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

  searchSubmit = (searchIp, applicationId, targetFromDate, targetToDate) => {
    this.setState(
      { searchIp, applicationId, targetFromDate, targetToDate, pageNum: 1 },
      () => {
        this.initData();
      }
    );
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
              <MetricSearchCard searchSubmit={this.searchSubmit} />
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
