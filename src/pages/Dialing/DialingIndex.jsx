import React, { Component } from "react";
import { PageHeader } from "antd";
import PropTypes from "prop-types";
export class DialingIndex extends Component {
  render() {
    return (
      <PageHeader title={this.props.title}>
        <iframe
          title="warn"
          width="100%"
          height="700"
          sandbox="allow-scripts allow-forms allow-same-origin"
          src={this.props.targetUrl}
        ></iframe>
      </PageHeader>
    );
  }
}
DialingIndex.propTypes = {
  title: PropTypes.string,
  targetUrl: PropTypes.string,
};
export default DialingIndex;
