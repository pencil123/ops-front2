import React from "react";
import AllMetricDetails from "@/pages/Prom/AllMetricDetails";
import AnalysedMetricData from "@/pages/Prom/AnalysedMetricData";
import ServerManager from "@/pages/User/ServerManager";
import ManagerList from "@/pages/User/ManagerList";
import ICPDomain from "./ICP/ICPDomain";
import Dashboard from "./Dashboard/Dashboard";

const menu = [
  {
    name: "DashBoard",
    icon: "icon-helm",
    key: "dashboard",
  },
  {
    name: "效能数据",
    icon: "icon-Metrics",
    key: "Prom",
    children: [
      {
        name: "效能明细数据",
        icon: "icon-submenu",
        key: "AllMetricDetails",
      },
      {
        name: "效能自定义检索",
        icon: "icon-submenu",
        key: "AnalysedMetricData",
      },
    ],
  },
  {
    name: "ICP域名备案",
    icon: "icon-ICP-",
    key: "icp",
    children: [
      {
        name: "全部ICP域名",
        icon: "icon-submenu",
        key: "ICPDomain",
      },
      {
        name: "正常ICP域名",
        icon: "icon-submenu",
        key: "ValidICPDomain",
      },
      {
        name: "异常ICP域名",
        icon: "icon-submenu",
        key: "InvalidICPDomain",
      },
    ],
  },
  {
    name: "管理员",
    icon: "icon-admin",
    key: "User",
    children: [
      {
        name: "服务器管理",
        icon: "icon-submenu",
        key: "ServerManager",
      },
      {
        name: "管理员列表",
        icon: "icon-submenu",
        key: "ManagerList",
      },
    ],
  },
];

const tabs = {
  dashboard: <Dashboard />,
  ServerManager: <ServerManager />,
  ManagerList: <ManagerList />,
  AllMetricDetails: <AllMetricDetails />,
  AnalysedMetricData: <AnalysedMetricData />,
  ValidICPDomain: <ICPDomain checkType="success" />,
  InvalidICPDomain: <ICPDomain checkType="fail" />,
  ICPDomain: <ICPDomain checkType="all" />,
};

export { menu, tabs };
