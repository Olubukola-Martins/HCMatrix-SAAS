import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TLeaveCycle } from "../LeaveCyclesAccordian";
import { useDeleteLeaveCycle } from "../../../hooks/leaveCycles/useDeleteLeaveCycle";

interface IProps extends IModalProps {
  cycle?: TLeaveCycle;
}
export const DeleteLeaveCycle: React.FC<IProps> = ({
  open,
  handleClose,
  cycle,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteLeaveCycle();

  const handleDelete = () => {
    if (!cycle) return;
    mutate(
      {
        id: cycle.id,
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

          //   queryClient.invalidateQueries({
          //     queryKey: [QUERY_KEY_FOR_TASKS_ASSIGNED_BY_EMPLOYEE],
          //     // exact: true,
          //   });
          //   queryClient.invalidateQueries({
          //     queryKey: [QUERY_KEY_FOR_TASKS_ASSIGNED_TO_EMPLOYEE],
          //     // exact: true,
          //   });
          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Leave Cycle"
      entity={{ type: "leave cycle", name: cycle?.name ?? "" }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
