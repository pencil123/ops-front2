import React from "react";
import AllMetricDetails from "@/pages/Prom/AllMetricDetails";
import AnalysedMetricData from "@/pages/Prom/AnalysedMetricData";
import ServerManager from "@/pages/Node/ServerManager";
import ServerNodeAdd from "@/pages/Node/ServerNodeAdd";
import ManagerList from "@/pages/User/ManagerList";
import ManagerAdd from "@/pages/User/ManagerAdd";
import ICPDomain from "./ICP/ICPDomain";

const menu = [
  {
    name: "效能数据",
    icon: "iconjiankong",
    key: "Prom",
    children: [
      {
        name: "效能明细数据",
        icon: "",
        key: "AllMetricDetails",
      },
      {
        name: "效能自定义检索",
        icon: "",
        key: "AnalysedMetricData",
      },
    ],
  },
  {
    name: "ICP域名备案",
    icon: "iconjiankong",
    key: "icp",
    children: [
      {
        name: "全部ICP域名",
        icon: "",
        key: "ICPDomain",
      },
      {
        name: "正常ICP域名",
        icon: "",
        key: "ValidICPDomain",
      },
      {
        name: "异常ICP域名",
        icon: "",
        key: "InvalidICPDomain",
      },
    ],
  },
  {
    name: "主机管理",
    icon: "info-circle",
    key: "Node",
    children: [
      {
        name: "服务器管理",
        icon: "",
        key: "ServerManager",
      },
      {
        name: "添加服务器",
        icon: "",
        key: "ServerNodeAdd",
      },
    ],
  },
  {
    name: "管理员",
    icon: "info-circle",
    key: "User",
    children: [
      {
        name: "管理员列表",
        icon: "",
        key: "ManagerList",
      },
      {
        name: "添加管理员",
        icon: "",
        key: "ManagerAdd",
      },
    ],
  },
];

const tabs = {
  ServerManager: <ServerManager />,
  ServerNodeAdd: <ServerNodeAdd />,
  ManagerList: <ManagerList />,
  ManagerAdd: <ManagerAdd />,
  AllMetricDetails: <AllMetricDetails />,
  AnalysedMetricData: <AnalysedMetricData />,
  ValidICPDomain:<ICPDomain checkType="success" />,
  InvalidICPDomain :<ICPDomain checkType="fail" />,
  ICPDomain:<ICPDomain checkType="all"/>
};

export { menu, tabs };
