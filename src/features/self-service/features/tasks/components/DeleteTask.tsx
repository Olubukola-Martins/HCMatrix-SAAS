import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { TTask } from "../types";
import { QUERY_KEY_FOR_TASKS_ASSIGNED_BY_EMPLOYEE } from "../hooks/assignee/useGetAllTasksAssignedByEmployee";
import { QUERY_KEY_FOR_TASKS_ASSIGNED_TO_EMPLOYEE } from "../hooks/assignedFor/useGetAllTasksAssignedToEmployee";

interface IProps extends IModalProps {
  task: TTask;
}
export const DeleteTask: React.FC<IProps> = ({ open, handleClose, task }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteTask();

  const handleDelete = () => {
    mutate(
      {
        id: task.id,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_TASKS_ASSIGNED_BY_EMPLOYEE],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_TASKS_ASSIGNED_TO_EMPLOYEE],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Task"
      entity={{ type: "task", name: task.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
