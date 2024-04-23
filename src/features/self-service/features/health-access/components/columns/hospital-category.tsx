import { Dropdown, Menu, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AiOutlineMore } from "react-icons/ai";
import { THospitalCategory } from "../../types/hospital/category";
import { THospitalCategoryAction } from "../settings/hospital/category/HospitalCategoryTable";

export const HOSPITAL_CATEGORY_TABLE_COLUMNS = (
  handleAction: (
    action: THospitalCategoryAction,
    category: THospitalCategory
  ) => void
): ColumnsType<THospitalCategory> => [
  {
    title: "Category",
    dataIndex: "Category",
    key: "Category",
    render: (_, item) => <span>{item.name} </span>,
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
