import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  Button,
  Dropdown,
  Menu,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { TTask } from "../types";
import { EditTask } from "./EditTask";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { DeleteTask } from "./DeleteTask";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

type TAction = "edit" | "delete";

export const TasksTable: React.FC<{
  data?: TTask[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TTask>["onChange"];
  total?: number;
  isTaskAssigner: boolean;
}> = ({ data, loading, pagination, onChange, total, isTaskAssigner }) => {
  const [task, setTask] = useState<TTask>();
  const [action, setAction] = useState<TAction>();
  const onClose = () => {
    setAction(undefined);
    setTask(undefined);
  };

  const handleAction = (props: { action: TAction; task: TTask }) => {
    const { task, action } = props;
    setAction(action);
    setTask(task);
  };

  const columns: ColumnsType<TTask> = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (_, item) => <span className="capitalize">{item.name} </span>,
    },
    {
      title: "Assigned To",
      dataIndex: "ass",
      key: "ass",
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
      {task && (
        <DeleteTask
          open={action === "delete"}
          handleClose={onClose}
          task={task}
        />
      )}
      {task && (
        <EditTask
          isTaskAssigner={isTaskAssigner}
          open={action === "edit"}
          handleClose={onClose}
          task={task}
        />
      )}
      <Table
        size="small"
        dataSource={data}
        loading={loading}
        columns={columns}
        pagination={{ ...pagination, total }}
        onChange={onChange}
      />
    </div>
  );
};
