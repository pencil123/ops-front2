import React, { Component } from "react";
import IcpAPI from "@/api/icp_api";
import PropTypes from "prop-types";
import DomainListTable from "./components/DomainListTable";

export class ICPDomain extends Component {
  state = {
    records: [],
    totalPage: "",
    err: "",
    pageNum: 1,
    crumbs: [],
  };

  componentDidMount() {
    this.initData();
  }

  initData = async () => {
    let data = { currentPage: this.state.pageNum,checkType:this.props.checkType};
    let result = await IcpAPI.list(data);
    this.setState({
      records: result.data.records,
      totalCount: result.data.totalCount,
    });
  };
  render() {
    return (
      <DomainListTable
        loading={this.state.loading}
        records={this.state.records}
        totalCount={this.state.totalCount}
        pageTurn={this.pageTurn}
      />
    );
  }
}

ICPDomain.propTypes = {
  checkType: PropTypes.string,
};

export default ICPDomain;
