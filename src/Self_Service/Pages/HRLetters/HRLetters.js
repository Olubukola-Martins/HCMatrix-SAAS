import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import { Dropdown, Menu, Popover, Select, Space, Table, Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import SelfServiceSubNav from "../../Components/SelfServiceSubNav";
import { AddNewDocument } from "../../Components/HRLetters/AddNewDocument";
const { Option } = Select;

const HRLetters = () => {
  const [switchGrid, setSwitchGrid] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },

    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      ellipsis: true,
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (val, item) => (
        <Space align="center" className="cursor-pointer">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="3">View</Menu.Item>
                <Menu.Item key="2">Delete</Menu.Item>
                <Menu.Item key="1">Download</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <EllipsisOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];
  const dataSource = Array(3)
    .fill({
      Name: "HR Survey Form",
      Description: "Lorem Ipsum Dolor Amit Sit",
    })
    .map((item, i) => ({ ...item, key: i }));
  return (
    <DashboardLayout>
      <SelfServiceSubNav />
      <AddNewDocument
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
      <div className="relative">
        <div className="Container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 font-extrabold ">
              <Link to="/self-service/home">
                <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
              </Link>
              <h2 className="text-xl text-accent">HR Letters & Documents</h2>
            </div>
            <button className="button" onClick={() => setIsModalOpen(true)}>
              Add New
            </button>
          </div>
          <div className="flex items-center justify-between text-lg font-normal mb-5 mt-9">
            <div className="flex items-center gap-3">
              <Select defaultValue="Owned By Me">
                <Option value="Owned By Anyone">Owned By Anyone</Option>
                <Option value="Owned By Me">Owned By Me</Option>
                <Option value="Not Owned By Me">Not Owned By Me</Option>
              </Select>
              <Select defaultValue="Last Opened By Me">
                <Option value="Owned By Anyone">Last Modified By Me </Option>
                <Option value="Owned By Me">Owned By Me</Option>
                <Option value="Not Owned By Me">Not Owned By Me</Option>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              {switchGrid ? (
                <Tooltip title="List View">
                  <i
                    className="ri-list-unordered text-2xl cursor-pointer"
                    onClick={() => setSwitchGrid(false)}
                  ></i>
                </Tooltip>
              ) : (
                <Tooltip title="Grid View">
                  <i
                    className="ri-layout-grid-line text-2xl cursor-pointer"
                    onClick={() => setSwitchGrid(true)}
                  ></i>
                </Tooltip>
              )}
            </div>
          </div>
          {switchGrid ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {[1, 2, 3, 4].map(() => (
                <div className="bg-card shadow-md rounded py-5 px-3 text-center flex flex-col gap-16">
                  <h4>Document</h4>

                  <h2 className="font-medium text-lg">HR Survey Form</h2>
                  <div className="flex items-center justify-between">
                    <span>Opened DD/MM/YY</span>
                    <Popover
                      content={() => (
                        <div className="flex flex-col gap-3">
                          <span>View</span>
                          <span>Download</span>
                        </div>
                      )}
                      trigger="click"
                    >
                      <i className="ri-more-2-fill text-lg cursor-pointer"></i>
                    </Popover>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <Table
                dataSource={dataSource}
                columns={columns}
                scroll={{ x: "max-content" }}
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HRLetters;
