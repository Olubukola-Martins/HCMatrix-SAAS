import { Dropdown, Menu, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AiOutlineMore } from "react-icons/ai";
import { TWorkSheduleShiftCategoryAction } from "../ShiftCategoryTable";
import { TWorkSheduleShiftCategory } from "../../../types";

export const WORK_SCHEDULE_SHIFT_CATEGORY_TABLE_COLUMNS = (
  handleAction: (
    action: TWorkSheduleShiftCategoryAction,
    category: TWorkSheduleShiftCategory
  ) => void
): ColumnsType<TWorkSheduleShiftCategory> => [
  {
    title: "Shift Name",
    dataIndex: "Shift Name",
    key: "Shift Name",
    render: (_, item) => <span>{item.name} </span>,
  },

  {
    title: "Status",
    dataIndex: "Status",
    key: "Status",
    render: (_, item) => (
      <span className="capitalize">
        {item.isEnabled ? "Enabled" : "Disabled"}{" "}
      </span>
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (_, item) => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="edit" onClick={() => handleAction("edit", item)}>
              Edit
            </Menu.Item>
            <Menu.Item
              key="toggle"
              onClick={() => handleAction("toggle", item)}
            >
              {item.isEnabled ? "Disable" : "Enable"}
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
        <Button title="Actions" icon={ <i className="ri-more-2-fill text-lg cursor-pointer"></i>} type="text" />
      </Dropdown>
    ),
  },
];
