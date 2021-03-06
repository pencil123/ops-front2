import React, { Component } from "react";
import DashBoardAPI from "@/api/dashboard";
import { Descriptions, PageHeader, Select, Divider, Row, Col } from "antd";
import SkywalkingAPI from "@/api/skywalking";
import Topology from "./components/Topology";
import "./dashboard.less";
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
    iptarget: "",
    topoTitle: "",
    topoNodes: [],
    topoCalls: [],
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
            sCodeSelectDefaultKey: res.data.applicationVOList[0].applicationId,
          },
          () => {
            this.sCodeSelect(res.data.applicationVOList[0].applicationId);
          }
        );
      }
    } catch (error) {
      console.error("dashborad page:", error);
    }
  };
  sCodeSelect = async (sCode) => {
    this.topologyRequest(sCode);
    let res = await DashBoardAPI.sCodeDashBoard({ applicationId: sCode });
    this.setState({ sCodeRecord: res.data, ipList: res.data.ipList });
    let varIpString = res.data.ipList.join("&var-ip=");
    let cpuUrlString =
      "https://grafana-ops.haier.net/d/oslinux001/linux?viewPanel=6&orgId=1&kiosk&var-ip=" +
      varIpString;
    let memUrlString =
      "https://grafana-ops.haier.net/d/oslinux001/linux?viewPanel=8&orgId=1&kiosk&var-ip=" +
      varIpString;
    let diskUrlString =
      "https://grafana-ops.haier.net/d/oslinux001/linux?viewPanel=10&orgId=1&kiosk&var-ip=" +
      varIpString;
    let warnUrlString =
      "https://grafana-ops.haier.net/d/oslinux001/linux?viewPanel=12&orgId=1&kiosk&var-ip=" +
      varIpString;
    this.setState({
      cpuUrlString,
      memUrlString,
      diskUrlString,
      warnUrlString,
      iptarget: res.data.ipList[0],
    });
  };
  topologyRequest = async (sCode) => {
    let res = await SkywalkingAPI.listApp({
      applicationId: sCode,
      pageSize: 100,
    });
    if (res.data.records.length === 0) {
      this.setState({
        topoTitle: "APM???????????????404",
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
    const sCodeRecord = this.state.sCodeRecord;
    return (
      <>
        <PageHeader
          ghost={true}
          subTitle={
            userRecord.applicationNum +
            "????????? / " +
            userRecord.nodeQuantity +
            "????????????"
          }
          title="??????????????????????????????"
        >
          <Descriptions bordered column={6}>
            <Descriptions.Item label="CPU????????????">
              {userRecord.cpuHighUsage}
            </Descriptions.Item>
            <Descriptions.Item label="CPU???????????????">
              {userRecord.cpuNormalUsage}
            </Descriptions.Item>
            <Descriptions.Item label="CPU????????????">
              {userRecord.cpuLowUsage}
            </Descriptions.Item>
            <Descriptions.Item label="??????????????????">
              {userRecord.memoryHighUsage}
            </Descriptions.Item>
            <Descriptions.Item label="?????????????????????">
              {userRecord.memoryNormalUsage}
            </Descriptions.Item>
            <Descriptions.Item label="??????????????????">
              {userRecord.memoryLowUsage}
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
        <Divider orientation="right">?????????</Divider>
        <PageHeader
          title="????????????"
          className="sCodeCard"
          extra={
            <div className="sCodeSelect">
              <Select
                key="1"
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
                    <Option
                      key={sCode.applicationId}
                      value={sCode.applicationId}
                    >
                      {sCode.applicationId}/{sCode.applicationName}
                    </Option>
                  );
                })}
              </Select>
              <Select
                key="1"
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
                {this.state.ipList.map((ipString) => {
                  return (
                    <Option key={ipString} value={ipString}>
                      {ipString}
                    </Option>
                  );
                })}
              </Select>
            </div>
          }
        >
          <Descriptions size="small" column={6}>
            <Descriptions.Item label="CPU????????????">
              {sCodeRecord.cpuHighUsage}
            </Descriptions.Item>
            <Descriptions.Item label="CPU???????????????">
              {sCodeRecord.cpuNormalUsage}
            </Descriptions.Item>
            <Descriptions.Item label="CPU????????????">
              {sCodeRecord.cpuLowUsage}
            </Descriptions.Item>
            <Descriptions.Item label="??????????????????">
              {sCodeRecord.memoryHighUsage}
            </Descriptions.Item>
            <Descriptions.Item label="?????????????????????">
              {sCodeRecord.memoryNormalUsage}
            </Descriptions.Item>
            <Descriptions.Item label="??????????????????">
              {sCodeRecord.memoryLowUsage}
            </Descriptions.Item>
          </Descriptions>
          <Topology
            nodes={this.state.topoNodes}
            calls={this.state.topoCalls}
            title={this.state.topoTitle}
          />
        </PageHeader>
        <Row>
          <Col span={8}>
            <iframe
              title="CPU"
              width="100%"
              height="370"
              sandbox="allow-scripts allow-forms allow-same-origin"
              src={this.state.cpuUrlString}
            ></iframe>
          </Col>
          <Col span={8}>
            <iframe
              title="mem"
              width="100%"
              height="370"
              sandbox="allow-scripts allow-forms allow-same-origin"
              src={this.state.memUrlString}
            ></iframe>
          </Col>
          <Col span={8}>
            <iframe
              title="disk"
              width="100%"
              height="370"
              sandbox="allow-scripts allow-forms allow-same-origin"
              src={this.state.diskUrlString}
            ></iframe>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <iframe
              title="warn"
              width="100%"
              height="370"
              sandbox="allow-scripts allow-forms allow-same-origin"
              src={this.state.warnUrlString}
            ></iframe>
          </Col>
        </Row>
      </>
    );
  }
}

export default Dashboard;
