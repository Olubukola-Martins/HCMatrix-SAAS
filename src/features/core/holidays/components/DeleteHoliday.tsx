import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { THoliday } from "../types";
import { useDeleteHoliday } from "../hooks/useDeleteHoliday";
import { QUERY_KEY_FOR_HOLIDAYS } from "../hooks/useGetHolidays";

interface IProps extends IModalProps {
  holiday?: THoliday;
}
export const DeleteHoliday: React.FC<IProps> = ({
  open,
  handleClose,
  holiday,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteHoliday();

  const handleDelete = () => {
    if (!holiday) return;
    mutate(
      {
        id: holiday.id,
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
            queryKey: [QUERY_KEY_FOR_HOLIDAYS],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Holiday"
      entity={{ type: "holiday", name: holiday?.title ?? "" }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
