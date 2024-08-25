import React from "react";
import { Table, Dropdown, Menu, Space } from "antd";
import {  MoreOutlined } from "@ant-design/icons";

export interface Candidate {
  key: string;
  name: string;
  email: React.ReactNode;
  jobPosition: string;
  interviewDate: string;
  interviewTime: string;
  modeOfInterview: string;
  totalScore: number;
}

interface AllCandidatesTableProps {
  data: Candidate[];
}

const AllCandidatesTable: React.FC<AllCandidatesTableProps> = ({ data }) => {
  const columns = [
    {
      title: "Candidate Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      key: "email",
      render: (_: any, record: Candidate) => {
       return <p className="w-28">{record.email}</p>;
      },
    },
    {
      title: "Job Position",
      dataIndex: "jobPosition",
      key: "jobPosition",
    },
    {
      title: "Interview Date",
      dataIndex: "interviewDate",
      key: "interviewDate",
    },
    {
      title: "Interview Time",
      dataIndex: "interviewTime",
      key: "interviewTime",
    },
    {
      title: "Mode of Interview",
      dataIndex: "modeOfInterview",
      key: "modeOfInterview",
    },
    {
      title: "Total Score",
      dataIndex: "totalScore",
      key: "totalScore",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Candidate) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="view">View Candidate</Menu.Item>
              <Menu.Item key="rate">Rate Candidate</Menu.Item>
              <Menu.Item key="link">View Interview Link</Menu.Item>
            </Menu>
          }
          trigger={["click"]}>
          <Space>
            <MoreOutlined className="text-xl font-bold cursor-pointer" />
          </Space>
        </Dropdown>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 7, showSizeChanger: false }}
      scroll={{ x: 700 }}
      rowSelection={{
        type: "checkbox",
      }}
    />
  );
};

export default AllCandidatesTable;


