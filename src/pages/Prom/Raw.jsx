import React, { Component } from "react";
import { Row, Col } from "antd";
import MetricAPI from "@/api/metric_api";
import MetricSearchCard from "./components/metricSearchCard";
import MetricListTable from "./components/metricListTable";


export class Raw extends Component {
    componentDidMount(){
    }
    
  initData = async () => {
    let data = {};
    if (this.state.pageNum !== "" && this.state.pageNum != null) {
      data.currentPage = this.state.pageNum;
    }
    if (this.state.searchIp !== "" && this.state.searchIp != null) {
      data.hostIp = this.state.searchIp;
    }
    if (this.state.applicationId !== "" && this.state.applicationId != null) {
      data.applicationId = this.state.applicationId;
    }
    if (this.state.targetToDate !== "" && this.state.targetToDate != null) {
      data.endTime = this.state.targetToDate;
    }
    if (this.state.targetFromDate !== "" && this.state.targetFromDate != null) {
      data.beginTime = this.state.targetFromDate;
    }
    let result = await MetricAPI.metricList(data);
    console.log(result);
    this.setState({
      records: result.data.records,
      totalPage: result.data.totalPage,
    });
  };
  render() {
    return (
      <>
        <Row id="SearchTab">
          <Col>
            <MetricSearchCard />
          </Col>
        </Row>
        <Row id="MetricTable">
          <Col>
            <MetricListTable />
          </Col>
        </Row>
      </>
    );
  }
}

export default Raw;
