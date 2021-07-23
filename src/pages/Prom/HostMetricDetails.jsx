import React, { Component } from "react";
import { Row, Col, PageHeader } from "antd";
import MetricAPI from "@/api/metric_api";
import MetricListTable from "./components/metricListTable";

export class HostMetricDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostIp: localStorage.getItem("hostMetric"),
      currentPage: 1,
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
      hostIp: this.state.hostIp,
      currentPage: this.state.pageNum,
    };
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

  render() {
    return (
      <Row id="MetricTable">
        <PageHeader
          title={"服务器节点: " + this.state.hostIp}
          style={{ width: "100%" }}
        />
        <Col>
          <MetricListTable
            loading={this.state.loading}
            records={this.state.records}
            totalCount={this.state.totalCount}
            pageTurn={this.pageTurn}
          />
        </Col>
      </Row>
    );
  }
}

export default HostMetricDetails;
