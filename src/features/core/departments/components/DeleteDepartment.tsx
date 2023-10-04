import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TDepartment } from "../types";
import { useDeleteTask } from "features/self-service/features/tasks/hooks/useDeleteTask";
import { QUERY_KEY_FOR_DEPARTMENTS } from "../hooks/useFetchDepartments";

interface IProps extends IModalProps {
  department?: TDepartment;
}
export const DeleteDepartment: React.FC<IProps> = ({
  open,
  handleClose,
  department,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteTask(); //TODO: Change when enpoint is provided

  const handleDelete = () => {
    if (!department) return;
    mutate(
      {
        id: department.id,
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
            queryKey: [QUERY_KEY_FOR_DEPARTMENTS],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Department"
      entity={{ type: "department", name: department?.name ?? "" }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
