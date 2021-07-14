import React, { Component } from "react";
import { Row, Col } from "antd";
import MetricSearchCard from "./metricSearchCard";

export class Raw extends Component {
  render() {
    return (
      <>
        <Row id="SearchTab">
          <Col>
            <MetricSearchCard />
          </Col>
        </Row>
      </>
    );
  }
}

export default Raw;
