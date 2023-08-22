import React from "react";
import { Menu, Space, Select, Table, Typography, Dropdown } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

// INTERFACE/TYPES
type DataSourceItem = {
  key: React.Key;
  title: string;
  candidate: string;
  hiringLead: string;
  createdOn: string;
  status: string;
};

export const JobOpeningContainer = () => {
  // FUNCTION TO HANDLE DROPDOWN CHANGES
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  // COLUMS OF TABLE
  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "Job Opening",
      dataIndex: "title",
    },
    {
      title: "Candidate",
      dataIndex: "candidate",
      key: "2",
    },
    {
      title: "Hiring Lead",
      dataIndex: "hiringLead",
      key: "3",
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "4",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "5",
      render: (status: boolean) => {
        return (
          <Typography.Paragraph>
            {status ? "Open" : "Closed"}
          </Typography.Paragraph>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">Edit</Menu.Item>
                <Menu.Item key="2">View </Menu.Item>
                <Menu.Item key="3">Delete</Menu.Item>
                <Menu.Item key="4">Expired</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  // DATASOURCE FOR TABLE
  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 8; i++) {
    dataSource.push({
      key: i,
      title: "Software Engineer",
      candidate: "5 candidates",
      hiringLead: "Basil Ikpe",
      createdOn: "--:--",
      status: "Open",
    });
  }

  return (
    <>
      {/* INPUTS BELOW NAVIGATION */}
      <Space wrap className="flex justify-between mb-6 mt-10 ">
        <div className="inline-flex gap-6">
          <Select
            defaultValue="open"
            className="w-44 border rounded-md hover:border-none important-hover text-[var(--accent)]"
            onChange={handleChange}
            options={[
              {
                value: "all",
                label: "All",
              },
              {
                value: "draft",
                label: "Draft",
              },
              {
                value: "open",
                label: "Open",
              },
              {
                value: "on hold",
                label: "On Hold",
              },
              {
                value: "filled",
                label: "Filled",
              },
              {
                value: "canceled",
                label: "Canceled",
              },
            ]}
          />
          <Select
            defaultValue="department"
            className="w-44 border rounded-md hover:border-none important-hover text-[var(--accent)] "
            options={[
              {
                value: "department",
                label: "Department",
              },
            ]}
          />
        </div>
        <Link to={appRoutes.recruitmentAddJobOpening} className="button">
          Add Job Opening
        </Link>
      </Space>

      {/* TABLE */}
      <Table columns={columns} dataSource={dataSource} scroll={{ x: 600 }} />
    </>
  );
};
