import React, { Component } from "react";
import { Table } from "antd";
import PropTypes from "prop-types";

export class SubDomainList extends Component {
  MypageTurn = (pageTrunObj) => {
    this.props.pageTurn(pageTrunObj.current, "subDomain");
  };
  render() {
    const columns = [
      {
        title: "域名",
        dataIndex: "domain",
      },
      {
        title: "应用名称",
        dataIndex: "appName",
      },
      {
        title: "应用S码",
        dataIndex: "appCode",
      },
      {
        title: "管理员",
        dataIndex: "managerName",
      },
      {
        title: "管理员工号",
        dataIndex: "managerCode",
      },
    ];

    return (
      <>
        {this.props.records.length === 0 ? (
          <div>此域名未注册子域名</div>
        ) : (
          <Table
            rowKey="id"
            onChange={this.MypageTurn}
            loading={this.props.loading}
            pagination={{
              defaultPageSize: 20,
              total: this.props.totalCount,
              showSizeChanger: false,
            }}
            dataSource={this.props.records}
            columns={columns}
          />
        )}
      </>
    );
  }
}

SubDomainList.propTypes = {
  pageTurn: PropTypes.func,
  records: PropTypes.array,
  totalCount: PropTypes.number,
  loading: PropTypes.bool,
};

export default SubDomainList;
