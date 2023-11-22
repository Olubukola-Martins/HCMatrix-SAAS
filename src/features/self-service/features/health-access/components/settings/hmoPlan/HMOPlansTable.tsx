import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu, Table } from "antd";
import { useGetHMOPlans } from "../../../hooks/hmoPlan/useGetHMOPlans";
import { THMOPlan } from "../../../types/hmoPlan";
import { ViewHMOPlan } from "./ViewHMOPlan";
import { EditHMOPlan } from "./EditHMOPlan";
import { DeleteHMOPlan } from "./DeleteHMOPlan";

type TAction = "edit" | "view" | "delete";
export const HMOPlansTable: React.FC<{
  search?: string;
}> = ({ search }) => {
  const [hmoPlan, setHmoPlan] = useState<THMOPlan>();
  const [action, setAction] = useState<TAction>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetHMOPlans({
    pagination,
    searchParams: { name: search },
  });
  const handleAction = (action: TAction, plan: THMOPlan) => {
    setAction(action);
    setHmoPlan(plan);
  };

  const columns: ColumnsType<THMOPlan> = [
    {
      title: "HMO Plan",
      dataIndex: "HMO Plan",
      key: "HMO Plan",

      render: (_, item) => <span>{item.name} </span>,
    },

    {
      title: "Number of allowed dependents ",
      dataIndex: "Number of allowed dependents ",
      key: "Number of allowed dependents ",
      render: (_, item) => (
        <span className="capitalize">{item.maxDependents} </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      ellipsis: true,
      render: (_, item) => (
        <span className="capitalize">{item.description} </span>
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
              <Menu.Item key="edit" onClick={() => handleAction("edit", item)}>
                Edit
              </Menu.Item>
              <Menu.Item
                key="delete"
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
      <ViewHMOPlan
        handleClose={() => setAction(undefined)}
        hmoPlan={hmoPlan}
        open={action === "view"}
      />
      <EditHMOPlan
        handleClose={() => setAction(undefined)}
        hmoPlan={hmoPlan}
        open={action === "edit"}
      />
      <DeleteHMOPlan
        handleClose={() => setAction(undefined)}
        plan={hmoPlan}
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
