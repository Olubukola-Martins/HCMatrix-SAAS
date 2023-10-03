import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { QUERY_KEY_FOR_BRANCHES } from "../hooks/useFetchBranches";
import { TBranch } from "../types";
import { useDeleteTask } from "features/self-service/features/tasks/hooks/useDeleteTask";

interface IProps extends IModalProps {
  branch?: TBranch;
}
export const DeleteBranch: React.FC<IProps> = ({
  open,
  handleClose,
  branch,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteTask(); //TODO: Change when enpoint is provided

  const handleDelete = () => {
    if (!branch) return;
    mutate(
      {
        id: branch.id,
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
            queryKey: [QUERY_KEY_FOR_BRANCHES],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Branch"
      entity={{ type: "branch", name: branch?.name ?? "" }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
