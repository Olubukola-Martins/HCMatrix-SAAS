import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { useReadAllAlerts } from "../hooks/read/useReadAllAlerts";
import { QUERY_KEY_FOR_NOTIFICATIONS } from "../hooks/useGetAlerts";

export const MarkAllAsRead: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useReadAllAlerts();

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
        title={`Mark Notifications as Read`}
        description={`Are you sure you want to mark all notifications as read?`}
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
