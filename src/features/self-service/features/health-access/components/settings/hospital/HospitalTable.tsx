import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu, Table } from "antd";
import { THospital } from "../../../types/hospital/hospital";
import { useGetHospitals } from "../../../hooks/hospital/useGetHospitals";
import { ViewHospital } from "./ViewHospital";
import { EditHospital } from "./EditHospital";
import { DeleteHospital } from "./DeleteHospital";

type TAction = "edit" | "view" | "delete";
export const HospitalTable: React.FC<{
  search?: string;
  stateId?: number;
  type?: "mine";
  showDelete?: boolean;
  showEdit?: boolean;
}> = ({ search, stateId, type, showDelete, showEdit }) => {
  const [hospital, setHospital] = useState<THospital>();
  const [action, setAction] = useState<TAction>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetHospitals({
    type,
    props: {
      pagination,
      searchParams: { name: search },
      stateId,
    },
  });
  const handleAction = (action: TAction, data: THospital) => {
    setAction(action);
    setHospital(data);
  };

  const columns: ColumnsType<THospital> = [
    {
      title: "",
      dataIndex: "_",
      key: "_",
      width: 50,
      render: (_, item) =>
        item.isRecommended ? (
          <div className="mx-auto bg-caramel w-2 h-2 rounded-full" />
        ) : null,
    },

    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (_, item) => <span className="capitalize">{item.name} </span>,
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
      render: (_, item) => (
        <span className="capitalize">{item.category.name} </span>
      ),
    },
    {
      title: "HMO Plan(s)",
      dataIndex: "HMO Plans",
      key: "HMO Plans",
      ellipsis: true,
      render: (_, item) => (
        <span className="capitalize">
          {item.hmoPlanManagement.map((x) => x.hmoPlan.name).join(", ")}{" "}
        </span>
      ),
    },
    {
      title: "Contact",
      dataIndex: "Contact",
      key: "Contact",
      render: (_, item) => (
        <span className="capitalize">{item.phoneNumber} </span>
      ),
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
      ellipsis: true,
      render: (_, item) => (
        <span className="capitalize">{item.address?.streetAddress}</span>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="view" onClick={() => handleAction("view", item)}>
                View Details
              </Menu.Item>
              <Menu.Item
                hidden={showEdit === false}
                key="edit"
                onClick={() => handleAction("edit", item)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="delete"
                hidden={showDelete === false}
                onClick={() => handleAction("delete", item)}
              >
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button title="Actions" icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <ViewHospital
        handleClose={() => setAction(undefined)}
        hospital={hospital}
        open={action === "view"}
      />
      <EditHospital
        handleClose={() => setAction(undefined)}
        hospital={hospital}
        open={action === "edit"}
      />
      <DeleteHospital
        handleClose={() => setAction(undefined)}
        hospital={hospital}
        open={action === "delete"}
      />
      <Table
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        columns={columns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
