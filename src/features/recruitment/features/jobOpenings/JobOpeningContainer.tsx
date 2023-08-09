import React from "react";
import { Menu, Space, Select, Button, Table, Typography, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { AppButton } from "components/button/AppButton";

// INTERFACE/TYPES
interface Item {
  label: string;
  key: string;
}
interface DataSourceItem {
  key: string;
  title: string;
  candidate: string;
  hiringLead: string;
  createdOn: string;
  status: string;
  action: string;
}

export const JobOpeningContainer = () => {
  // FUNCTION TO HANDLE DROPDOWN CHANGES
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  // ARRAY FOR ACTIONS COLUMN OPTIONS
  const actions: string[] = ["Edit", "View", "Expired", "Delete"];

  // FUNCTION TO HANDLE ACTIONS DROPDOWN
  const renderActionsDropdown = (): JSX.Element => {
    const menu = (
      <Menu>
        {actions.map((action) => (
          <Menu.Item key={action}>
            <a target="_blank" rel="noopener noreferrer" href="#">
              {action}
            </a>
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <Dropdown overlay={menu} className="cursor-pointer">
        <MoreOutlined />
      </Dropdown>
    );
  };

  // COLUMS OF TABLE
  const columns = [
    {
      title: "Job Opening",
      dataIndex: "title",
      key: "1",
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
      key: "6",
      render: () => {
        return renderActionsDropdown();
      },
    },
  ];

  // DATASOURCE FOR TABLE
  const dataSource: DataSourceItem[] = [
    {
      key: "1",
      title: "Software Engineer",
      candidate: "5 candidates",
      hiringLead: "Basil Ikpe",
      createdOn: "--:--",
      status: "Open",
      action: "",
    },
    {
      key: "2",
      title: "Software Engineer",
      candidate: "5 candidates",
      hiringLead: "Basil Ikpe",
      createdOn: "--:--",
      status: "Open",
      action: "",
    },
    {
      key: "3",
      title: "Software Engineer",
      candidate: "5 candidates",
      hiringLead: "Basil Ikpe",
      createdOn: "--:--",
      status: "Open",
      action: "",
    },
    {
      key: "4",
      title: "Software Engineer",
      candidate: "5 candidates",
      hiringLead: "Basil Ikpe",
      createdOn: "--:--",
      status: "Open",
      action: "",
    },
    {
      key: "5",
      title: "Software Engineer",
      candidate: "5 candidates",
      hiringLead: "Basil Ikpe",
      createdOn: "--:--",
      status: "Open",
      action: "",
    },
    {
      key: "6",
      title: "Software Engineer",
      candidate: "5 candidates",
      hiringLead: "Basil Ikpe",
      createdOn: "--:--",
      status: "Open",
      action: "",
    },
    {
      key: "7",
      title: "Software Engineer",
      candidate: "5 candidates",
      hiringLead: "Basil Ikpe",
      createdOn: "--:--",
      status: "Open",
      action: "",
    },
    {
      key: "8",
      title: "Software Engineer",
      candidate: "5 candidates",
      hiringLead: "Basil Ikpe",
      createdOn: "--:--",
      status: "Open",
      action: "",
    },
  ];

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
        <AppButton label="Add Job Opening" />
      </Space>

      {/* TABLE */}
      <Table columns={columns} dataSource={dataSource} />
    </>

    // <div>
    //   JobOpeningContainer: The design for this component can be found in this
    //   link{" "}
    //   <a
    //     className="text-caramel underline"
    //     target="_blank"
    //     rel="noreferrer"
    //     href="https://www.figma.com/proto/G8Ts28WXoXmzNbW1YnR4wd/Hcmatrix-Third-Iteration?type=design&node-id=403-1253&t=z9e48neZNOxv0wr5-0&scaling=min-zoom&page-id=402%3A1251&starting-point-node-id=463%3A24778"
    //   >
    //     figma
    //   </a>
    // </div>
  );
};
