import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Table, TablePaginationConfig, TableProps } from "antd";
import { TTask } from "../types";
import { EditTask } from "./EditTask";
import { DeleteTask } from "./DeleteTask";
import TaskComment from "./comment/TaskComment";
import { TASK_TABLE_COLUMNS } from "./columns";
import { TableFocusTypeBtn } from "components/table";

export type TTaskAction = "edit" | "delete" | "comment";

export const TasksTable: React.FC<{
  data?: TTask[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TTask>["onChange"];
  total?: number;
  isTaskAssigner: boolean;
}> = ({ data, loading, pagination, onChange, total, isTaskAssigner }) => {
  const [task, setTask] = useState<TTask>();
  const [action, setAction] = useState<TTaskAction>();
  const onClose = () => {
    setAction(undefined);
    setTask(undefined);
  };

  const handleAction = (props: { action: TTaskAction; task: TTask }) => {
    const { task, action } = props;
    setAction(action);
    setTask(task);
  };

  const columns: ColumnsType<TTask> = TASK_TABLE_COLUMNS(handleAction);
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TTask>>(columns);
  return (
    <div className="space-y-6">
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
      <TaskComment
        taskId={task?.id}
        open={action === "comment"}
        handleClose={onClose}
        taskName={task?.name ?? ""}
      />
      <div className="flex justify-end">
        {TableFocusTypeBtn<TTask>({
          selectedColumns,
          setSelectedColumns,
          data: {
            columns,
          },
        })}
      </div>
      <Table
        size="small"
        dataSource={data}
        loading={loading}
        columns={selectedColumns}
        pagination={{ ...pagination, total }}
        onChange={onChange}
      />
    </div>
  );
};
