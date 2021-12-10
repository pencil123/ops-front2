import React from "react";
import AllMetricDetails from "@/pages/Prom/AllMetricDetails";
import AnalysedMetricData from "@/pages/Prom/AnalysedMetricData";
import ServerManager from "@/pages/User/ServerManager";
import ManagerList from "@/pages/User/ManagerList";
import ICPDomain from "./ICP/ICPDomain";
import Dashboard from "./Dashboard/Dashboard";
import DialingIndex from "./Dialing/DialingIndex";
import AlarmIndex from "./Alarm/AlarmIndex";
import Statlist from "./Querylog/Statlist";

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
    name: "拨测应用",
    icon: "icon-fuwuboce",
    key: "dialing",
    children: [
      {
        name: "中台API拨测",
        icon: "icon-submenu",
        key: "CenterAPIDialing",
      },
      {
        name: "应用首页URL拨测",
        icon: "icon-submenu",
        key: "AppIndexDialing",
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
    name: "域名访问统计",
    icon: "icon-Metrics",
    key: "querylog",
    children: [
      {
        name: "访问统计列表",
        icon: "icon-submenu",
        key: "Statlist",
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
  Statlist: <Statlist />,
  CenterAPIDialing: (
    <DialingIndex
      title="中台API拨测"
      targetUrl="https://grafana-ops.haier.net/d/bxywGBqGz/api_monitor?orgId=1"
    />
  ),
  AppIndexDialing: (
    <DialingIndex
      title="应用首页URL拨测"
      targetUrl="https://grafana-ops.haier.net/d/RjX9_dznz/app_monitor?orgId=1&refresh=5s"
    />
  ),
  AlarmIndex: (
    <AlarmIndex
      title="告警信息查询"
      targetUrl="https://grafana-ops.haier.net/d/NYp999aGz/gao-jing-xin-xi-cha-xun?orgId=1"
    />
  ),
};

export { menu, tabs };
