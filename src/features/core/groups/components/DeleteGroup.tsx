import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TGroup } from "../types";
import { useDeleteGroup } from "../hooks/useDeleteGroup";
import { QUERY_KEY_FOR_GROUPS } from "../hooks/useFetchGroups";

interface IProps extends IModalProps {
  group?: TGroup;
}
export const DeleteGroup: React.FC<IProps> = ({ open, handleClose, group }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteGroup(); //TODO: Change when enpoint is provided

  const handleDelete = () => {
    if (!group) return;
    mutate(
      {
        id: group.id,
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
            queryKey: [QUERY_KEY_FOR_GROUPS],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Group"
      entity={{ type: "group", name: group?.name ?? "" }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
