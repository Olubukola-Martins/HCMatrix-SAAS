import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Document from "./Document";
import CandidateInfo from "./CandidateInfo";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "candidateInfo",
    label: "Candidate Info",
    children: <CandidateInfo/>,
  },
  {
    key: "document",
    label: "Doument",
    children: <Document />,
  },
  {
    key: "comments",
    label: "Comments",
    children: "Content of Tab Pane 3",
  },
];

const CandidateInfoTab: React.FC = () => <Tabs defaultActiveKey="candidateInfo" items={items} onChange={onChange} />;

export default CandidateInfoTab;
