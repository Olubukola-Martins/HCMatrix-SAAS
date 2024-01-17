import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TNotification } from "../types";
import { useDeleteAlert } from "../hooks/useDeleteAlert";
import { QUERY_KEY_FOR_NOTIFICATIONS } from "../hooks/useGetAlerts";
import { QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT } from "../hooks/unRead/useGetUnReadNotificationCount";

interface IProps extends IModalProps {
  data: TNotification;
}
export const DeleteNotification: React.FC<IProps> = ({
  open,
  handleClose,
  data,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteAlert();

  const handleDelete = () => {
    mutate(
      {
        id: data.id,
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

          queryClient.setQueriesData(
            [QUERY_KEY_FOR_NOTIFICATIONS],
            (val: unknown): { data: TNotification[]; total: number } => {
              const prevData = val as { data: TNotification[]; total: number };
              const updateData = prevData.data.filter(
                (notification) => notification.id !== data.id
              );
              return { data: updateData, total: prevData.total - 1 };
            }
          );

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Notification"
      entity={{ type: "notification", name: data.title }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
