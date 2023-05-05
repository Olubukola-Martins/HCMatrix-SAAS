import { Dropdown, Menu, Space, Table } from "antd";
import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import { ISFEntry } from "./SurveyFormsContainer";
import { Link } from "react-router-dom";

interface IProps {
  data?: ISFEntry[];
}

const SurveyFormsListView = ({ data = [] }: IProps) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },

    {
      title: "Last Modified",
      dataIndex: "lastModified",
      key: "lastModified",
    },

    {
      title: "Action",
      key: "action",

      render: (val: string, item: ISFEntry) => (
        <Space align="center" className="cursor-pointer">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="3">
                  <Link to={`/self-service/survey-form/${item.id}`}>View</Link>
                </Menu.Item>
                <Menu.Item key="2">Rename</Menu.Item>
                <Menu.Item key="1">Delete</Menu.Item>
              </Menu>
            }
            trigger={["click", "hover"]}
          >
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} size="small" />
    </div>
  );
};

export default SurveyFormsListView;
