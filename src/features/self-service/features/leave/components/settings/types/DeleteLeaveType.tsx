import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TLeaveType } from "../../../types";
import { useDeleteLeaveType } from "../../../hooks/leaveTypes/useDeleteLeaveType";
import { QUERY_KEY_FOR_LEAVE_TYPES } from "../../../hooks/leaveTypes/useGetLeaveTypes";

interface IProps extends IModalProps {
  type?: TLeaveType;
}
export const DeleteLeaveType: React.FC<IProps> = ({
  open,
  handleClose,
  type,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteLeaveType();

  const handleDelete = () => {
    if (!type) return;
    mutate(
      {
        id: type.id,
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
            queryKey: [QUERY_KEY_FOR_LEAVE_TYPES],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Leave Type"
      entity={{ type: "leave type", name: type?.name ?? "" }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
