import { AiOutlineMore } from "react-icons/ai";
import { TTaskAction } from "../TasksTable";
import { Dropdown, Menu, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { TTask } from "../../types";

export const TASK_TABLE_COLUMNS = (
  handleAction: (props: { action: TTaskAction; task: TTask }) => void
): ColumnsType<TTask> => [
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    render: (_, item) => <span className="capitalize">{item.name} </span>,
  },
  {
    title: "Assigned To",
    dataIndex: "Assigned To",
    key: "Assigned To",
    render: (_, item) => (
      <span className="capitalize">
        {getEmployeeFullName(item.assignedTo)}{" "}
      </span>
    ),
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, item) => (
      <span
        className="capitalize"
        style={{ color: getAppropriateColorForStatus(item.status) }}
      >
        {item.status}{" "}
      </span>
    ),
  },
  {
    title: "Priority",
    dataIndex: "Priority",
    key: "Priority",
    render: (_, item) => (
      <span
        className="capitalize"
        style={{ color: getAppropriateColorForStatus(item.priority) }}
      >
        {item.priority}{" "}
      </span>
    ),
  },
  {
    title: "Date Assigned",
    dataIndex: "Date Assigned",
    key: "Date Assigned",
    render: (_, item) => (
      <span>{moment(item.dateAssigned).format(DEFAULT_DATE_FORMAT)} </span>
    ),
  },
  {
    title: "Due Date",
    dataIndex: "Due Date",
    key: "Due Date",
    render: (_, item) => (
      <span>{moment(item.dueDate).format(DEFAULT_DATE_FORMAT)} </span>
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (_, item) => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              key="3"
              onClick={() => handleAction({ task: item, action: "edit" })}
            >
              {item.status === "closed" ? "View" : "Update"}
            </Menu.Item>
            <Menu.Item
              hidden={item.status === "closed"}
              key="4"
              onClick={() => handleAction({ task: item, action: "delete" })}
            >
              Delete
            </Menu.Item>
            <Menu.Item
              key="comment"
              onClick={() => handleAction({ task: item, action: "comment" })}
            >
              Comment
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
