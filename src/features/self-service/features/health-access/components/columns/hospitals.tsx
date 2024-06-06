import { Button, Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AiOutlineMore } from "react-icons/ai";
import { THospital } from "../../types/hospital/hospital";
import { THospitalAction } from "../settings/hospital/HospitalTable";

export const HOSPITAL_TABLE_COLUMNS = (
  handleAction: (action: THospitalAction, data: THospital) => void,
  showDelete?: boolean,
  showEdit?: boolean
): ColumnsType<THospital> => [
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
        <Button title="Actions" icon={<AiOutlineMore />} type="text" />
      </Dropdown>
    ),
  },
];
