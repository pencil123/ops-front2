import React, { Component } from "react";
import { Row, Col } from "antd";
import MetricAPI from "@/api/metric_api";
import MetricSearchCard from "./components/metricSearchCard";
import MetricListTable from "./components/metricListTable";

export class AllMetricDetails extends Component {
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
    let data = {};
    data.currentPage = this.state.pageNum;
    data.hostIp = this.state.searchIp;
    data.applicationId = this.state.applicationId;
    data.endTime = this.state.targetToDate;
    data.beginTime = this.state.targetFromDate;
    let result = await MetricAPI.metricList(data);
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
          <Col>
            <MetricSearchCard searchSubmit={this.searchSubmit} />
          </Col>
        </Row>
        <Row id="MetricTable">
          <Col>
            <MetricListTable
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

export default AllMetricDetails;
