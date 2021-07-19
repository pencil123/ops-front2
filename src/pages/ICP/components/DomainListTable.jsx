import React, { Component } from "react";
import { Table } from "antd";
import PropTypes from "prop-types";
import { PanesContext } from "@/context/Panes";

export class DomainListTable extends Component {
  render() {
    const httpType = {
      http: "http://",
      httpw: "http://www.",
      https: "https://",
      httpsw: "https://www.",
    };
    const columns = [
      {
        title: "域名",
        dataIndex: "domain",
      },
      {
        title: "备案编号",
        dataIndex: "siteLicense",
      },
      {
        title: "公司名称",
        dataIndex: "companyName",
      },
      {
        title: "管理人/工号",
        dataIndex: "managerName",
        render: (text, row) => (
          <>
            {row.managerName}({row.managerCode})
          </>
        ),
      },
      {
        title: "备案状态",
        dataIndex: "icpState",
        render: (text) => {
          return text ? "已备案" : "未备案";
        },
      },
      {
        title: "网站检测",
        dataIndex: "http",
        render: (text, row) => {
          let result = "";
          for (let httptype in httpType) {
            if (row[httptype] === 0) {
              result = `${result}<a class='text-secondary' target='_blank' href=${httpType[httptype]}${row.domain}>${httptype}</a>`;
            } else if (row[httptype] === 1) {
              result = `${result}<a class='text-danger' target='_blank' href=${httpType[httptype]}${row.domain}>${httptype}</a>`;
            } else if (row[httptype] === 2) {
              result = `${result}<a class='text-primary' target='_blank'  href=${httpType[httptype]}${row.domain}>${httptype}</a>`;
            }
          }
          return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
        },
      },
    ];
    return (
      <Table
        rowKey="id"
        onChange={this.props.pageTurn}
        loading={this.props.loading}
        pagination={{
          defaultPageSize: 20,
          total: this.props.totalCount,
          showSizeChanger: false,
        }}
        dataSource={this.props.records}
        columns={columns}
      />
    );
  }
}

DomainListTable.propTypes = {
  pageTurn: PropTypes.func,
  totalCount: PropTypes.number,
  records: PropTypes.array,
  loading: PropTypes.bool,
  metricType: PropTypes.string,
};

DomainListTable.contextType = PanesContext;
export default DomainListTable;
