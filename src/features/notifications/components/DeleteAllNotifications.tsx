import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { QUERY_KEY_FOR_NOTIFICATIONS } from "../hooks/useGetAlerts";
import { useDeleteAllAlert } from "../hooks/useDeleteAllAlert";

export const DeleteAllNotifications: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteAllAlert();

  const handleSubmit = () => {
    mutate(undefined, {
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (res) => {
        openNotification({
          state: "success",

          title: "Success",
          description: res.data.message,
          // duration: 0.4,
        });

        handleClose();

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_FOR_NOTIFICATIONS],
          // exact: true,
        });
      },
    });
  };

  return (
    <>
      <ConfirmationModal
        title={`Clear all Notifications`}
        description={`Are you sure you want to clear all notifications?`}
        handleClose={handleClose}
        open={open}
        handleConfirm={{
          fn: () => handleSubmit(),
          isLoading: isLoading,
        }}
      />
    </>
  );
};
