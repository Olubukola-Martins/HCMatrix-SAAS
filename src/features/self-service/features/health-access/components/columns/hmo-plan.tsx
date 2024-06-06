import { Dropdown, Menu, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AiOutlineMore } from "react-icons/ai";
import { THMOPlan } from "../../types/hmoPlan";
import { THMOPlanAction } from "../settings/hmoPlan/HMOPlansTable";

export const HMO_PLAN_TABLE_COLUMNS = (
  handleAction: (action: THMOPlanAction, plan: THMOPlan) => void
): ColumnsType<THMOPlan> => [
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
        <Button title="Actions" icon={<AiOutlineMore />} type="text" />
      </Dropdown>
    ),
  },
];
