import React, { Component } from "react";
import DomainStatTable from "./components/domainStatTable";
import QuerylogAPI from "@/api/querylog_api";
export class Statlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      totalCount: "",
      err: "",
      pageNum: 1,
    };
  }
  componentDidMount() {
    this.initData();
  }

  initData = async () => {
    let data = {
      currentPage: this.state.pageNum,
    };
    let result = await QuerylogAPI.queryPage(data);
    this.setState({
      records: result.data.records,
      totalCount: result.data.totalCount,
    });
  };
  pageTurn = (pageTrunObj) => {
    this.setState({ pageNum: pageTrunObj.current }, () => {
      this.initData();
    });
  };
  render() {
    return (
      <div>
        <DomainStatTable
          records={this.state.records}
          totalCount={this.state.totalCount}
          loading={this.state.loading}
          current={this.state.pageNum}
          pageTurn={this.pageTurn}
        />
      </div>
    );
  }
}

export default Statlist;
