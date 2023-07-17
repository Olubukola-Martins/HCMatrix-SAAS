import { Dropdown, Menu, Select } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { appRoutes } from "config/router/paths";
import React from "react";
import { Link } from "react-router-dom";

type TTrackP = {
  key: React.Key;
  name: string;
  type: string;
  createdDate: string;
};

const data: TTrackP[] = [
  {
    key: 1,
    name: "HTML and CSS Advance",
    type: "Online",
    createdDate: "19th of june 2023",
  },
  {
    key: 2,
    name: "HTML and CSS Advance",
    type: "Online",
    createdDate: "19th of june 2023",
  },
];

export const MandatoryTraining = () => {
  const columns: ColumnsType<TTrackP> = [
    {
      title: "Training",
      dataIndex: "name",
    },
    {
      title: "Training type",
      dataIndex: "type",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
    },
    {
      title: "Action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <Link to={appRoutes.trainingDetails(1).path}>
                    View Training
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">View Employee</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end gap-3">
        <Select
          placeholder="Pending Training"
          options={[{ value: 1, label: "Pending Training" }]}
        />
        <Select
          placeholder="Training Type"
          options={[{ value: 1, label: "Training Type" }]}
        />
      </div>
      <Table
        className="mt-3"
        columns={columns}
        dataSource={data}
        scroll={{ x: 600 }}
      />
    </div>
  );
};
