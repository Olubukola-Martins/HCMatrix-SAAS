import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TDesignation } from "../types";
import { useDeleteTask } from "features/self-service/features/tasks/hooks/useDeleteTask";
import { QUERY_KEY_FOR_DESIGNATIONS } from "../hooks/useFetchDesignations";
import { useDeleteDesignation } from "../hooks/useDeleteDesignation";

interface IProps extends IModalProps {
  designation?: TDesignation;
}
export const DeleteDesignation: React.FC<IProps> = ({
  open,
  handleClose,
  designation,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteDesignation();

  const handleDelete = () => {
    if (!designation) return;
    mutate(
      {
        id: designation.id,
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
            queryKey: [QUERY_KEY_FOR_DESIGNATIONS],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Designation"
      entity={{ type: "designation", name: designation?.name ?? "" }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
