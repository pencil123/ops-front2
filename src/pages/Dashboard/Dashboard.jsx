import React, { Component } from "react";
import DashBoardAPI from "@/api/dashboard";
import QuerylogAPI from "@/api/querylog_api";
import { Descriptions, PageHeader, Select, Divider, Empty } from "antd";
import SkywalkingAPI from "@/api/skywalking";
import Topology from "./components/Topology";
import DomainStat from "./components/DomainStat";
import "./dashboard.less";
import NodeStat from "./components/NodeStat";
export class Dashboard extends Component {
  state = {
    userRecord: {},
    sCodeList: [],
    sCodeRecord: {},
    ipList: [],
    cpuUrlString: "",
    memUrlString: "",
    diskUrlString: "",
    warnUrlString: "",
    domainStat: {},
    domainQueryList: [],
    domainList: [],
    iptarget: "",
    domaintarget: "",
    topoTitle: "",
    topoNodes: [],
    topoCalls: [],
    memList: [],
    cpuList: [],
    createtime: [],
    sCodeSelectDefaultKey: "",
  };

  componentDidMount() {
    this.initData();
  }

  initData = async () => {
    try {
      let res = await DashBoardAPI.userDashBoard();
      console.log("page recevie:", res);
      if (res.data.applicationVOList.length != 0) {
        this.setState(
          {
            userRecord: res.data,
            sCodeList: res.data.applicationVOList,
            sCodeSelectDefaultKey: res.data.applicationVOList[0].appCode,
          },
          () => {
            this.sCodeSelect(res.data.applicationVOList[0].appCode);
          }
        );
      }
    } catch (error) {
      console.error("dashborad page:", error);
    }
    try {
      let res = await QuerylogAPI.getDashboard();
      this.setState({
        domainStat: res.data,
      });
    } catch (error) {
      console.error("querlog dashborad page:", error);
    }
  };
  sCodeSelect = async (sCode) => {
    this.topologyRequest(sCode);
    this.setState({ sCodeSelectDefaultKey: sCode });
    let res = await DashBoardAPI.sCodeDashBoard({ appCode: sCode });
    // nodeStat 处理
    if (res.data.ipList != null) {
      this.setState(
        {
          iptarget: res.data.ipList[0],
        },
        () => {
          this.ipSelect(this.state.iptarget);
        }
      );
    } else {
      this.setState({ iptarget: "" });
    }
    // DomainStat 处理
    let sCodeDomains = await QuerylogAPI.getStatByScode({ appCode: sCode });
    if (sCodeDomains.data != null) {
      const domains = [];
      sCodeDomains.data.forEach((item) => {
        domains.push(item.domain);
      });
      this.setState(
        {
          domainQueryList: sCodeDomains.data,
          domainList: domains,
          domaintarget: domains[0],
        },
        () => {
          this.domainSelect(domains[0]);
        }
      );
    } else {
      this.setState({
        domainQueryList: [],
        domainList: [],
        domaintarget: "",
      });
    }
    this.setState({
      ipList: res.data.ipList,
      sCodeRecord: res.data,
    });
  };

  //nodeStat 节点所有函数 start
  ipSelect = async (hostIp) => {
    let res = await DashBoardAPI.queryHostStat({ hostIp: hostIp });
    if (res != null) {
      this.setState({
        iptarget: hostIp,
        memList: res.memoryMaxUsage,
        cpuList: res.cpuMaxUsage,
        createtime: res.createTime,
      });
    }
  };

  // DomainStat 节点所有函数 start
  domainSelect = async (domainString) => {
    let res = await QuerylogAPI.queryColumnStat({ domain: domainString });
    if (res != null) {
      this.setState({
        domaintarget: domainString,
        domainuv: res.pv,
        domainpv: res.uv,
        domainavg: res.avgResponsetime,
        domainsum: res.sumSize,
        domaindate: res.createTime,
      });
    }
  };
  // APM 节点所有函数 start
  topologyRequest = async (sCode) => {
    let res = await SkywalkingAPI.listApp({
      appCode: sCode,
      pageSize: 100,
    });
    if (res.data.records.length === 0) {
      this.setState({
        topoTitle: "APM数据未维护404",
        topoCalls: [],
        topoNodes: [],
      });
      return "";
    }
    let ServiceIds = res.data.records.map((record) => {
      return record.id.toString();
    });
    let topRes = await SkywalkingAPI.topologyMeta({
      serviceIds: ServiceIds.toString(),
    });
    this.setState({
      topoTitle: sCode,
      topoCalls: topRes.data.topo.calls,
      topoNodes: topRes.data.topo.nodes,
    });
  };

  render() {
    const { Option } = Select;
    const userRecord = this.state.userRecord;
    const domainStat = this.state.domainStat;
    return (
      <>
        <PageHeader
          ghost={true}
          subTitle={
            userRecord.applicationNum +
            "个项目 / " +
            userRecord.nodeQuantity +
            "台服务器"
          }
          title="项目和服务器信息概览"
        >
          <Descriptions bordered column={3}>
            <Descriptions.Item label="CPU负载高" labelStyle={{ color: "Red" }}>
              {userRecord.cpuHighUsage}
            </Descriptions.Item>
            <Descriptions.Item
              label="CPU负载正常"
              labelStyle={{ color: "Blue" }}
            >
              {userRecord.cpuNormalUsage}
            </Descriptions.Item>
            <Descriptions.Item label="CPU负载低">
              {userRecord.cpuLowUsage}
            </Descriptions.Item>
            <Descriptions.Item label="内存负载高" labelStyle={{ color: "Red" }}>
              {userRecord.memoryHighUsage}
            </Descriptions.Item>
            <Descriptions.Item
              label="内存负载正常"
              labelStyle={{ color: "Blue" }}
            >
              {userRecord.memoryNormalUsage}
            </Descriptions.Item>
            <Descriptions.Item label="内存负载低">
              {userRecord.memoryLowUsage}
            </Descriptions.Item>
            <Descriptions.Item label="统计域名数">
              {domainStat.toltalCount}
            </Descriptions.Item>
            <Descriptions.Item
              label="域名访问分析"
              labelStyle={{ color: "Blue" }}
            >
              {domainStat.statCount}
            </Descriptions.Item>
            <Descriptions.Item
              label="未收集域名访问"
              labelStyle={{ color: "Red" }}
            >
              {domainStat.unStatCount}
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
        <Divider orientation="right">分割线</Divider>
        <PageHeader
          title="选择项目"
          className="sCodeCard"
          extra={
            <div className="sCodeSelect">
              <Select
                key="sCodeSelect"
                showSearch
                value={this.state.sCodeSelectDefaultKey}
                style={{ width: 270 }}
                optionFilterProp="children"
                onChange={this.sCodeSelect}
                filterOption={(input, option) =>
                  (Array.isArray(option.props.children)
                    ? option.props.children.join("")
                    : option.props.children
                  )
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.sCodeList.map((sCode) => {
                  return (
                    <Option key={sCode.appCode} value={sCode.appCode}>
                      {sCode.appCode}/{sCode.appName}
                    </Option>
                  );
                })}
              </Select>
            </div>
          }
        ></PageHeader>
        <PageHeader
          title="服务器节点信息"
          className="nodeCard"
          extra={
            <Select
              key="ipSelect"
              showSearch
              value={this.state.iptarget}
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.ipSelect}
              filterOption={(input, option) =>
                (Array.isArray(option.props.children)
                  ? option.props.children.join("")
                  : option.props.children
                )
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.ipList &&
                this.state.ipList.map((ipString) => {
                  return (
                    <Option key={ipString} value={ipString}>
                      {ipString}
                    </Option>
                  );
                })}
            </Select>
          }
        >
          <NodeStat
            sCodeRecord={this.state.sCodeRecord}
            memList={this.state.memList}
            cpuList={this.state.cpuList}
            createtime={this.state.createtime}
          />
        </PageHeader>
        <PageHeader
          title="域名信息"
          className="domainCard"
          extra={
            <Select
              key="domainSelect"
              showSearch
              value={this.state.domaintarget}
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.domainSelect}
              filterOption={(input, option) =>
                (Array.isArray(option.props.children)
                  ? option.props.children.join("")
                  : option.props.children
                )
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.domainList &&
                this.state.domainList.map((domainString) => {
                  return (
                    <Option key={domainString} value={domainString}>
                      {domainString}
                    </Option>
                  );
                })}
            </Select>
          }
        >
          {this.state.domainQueryList.length > 0 ? (
            <DomainStat
              domainStats={this.state.domainQueryList}
              uv={this.state.domainuv}
              pv={this.state.domainpv}
              avg={this.state.domainavg}
              sum={this.state.domainsum}
              createDate={this.state.domaindate}
            />
          ) : (
            <Empty description="此项目中无关联域名数据" />
          )}
        </PageHeader>
        <PageHeader title="APM信息" className="domainCard">
          <Topology
            nodes={this.state.topoNodes}
            calls={this.state.topoCalls}
            title={this.state.topoTitle}
          />
        </PageHeader>
      </>
    );
  }
}

export default Dashboard;
