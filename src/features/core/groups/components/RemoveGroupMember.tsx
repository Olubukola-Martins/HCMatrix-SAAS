import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TGroup } from "../types";
import { useDeleteGroup } from "../hooks/useDeleteGroup";
import { QUERY_KEY_FOR_GROUPS } from "../hooks/useFetchGroups";
import { useRemoveMemberFromGroup } from "../hooks/useRemoveMemberFromGroup";
import ConfirmationModal from "components/modals/ConfirmationModal";

interface IProps extends IModalProps {
  groupName: string;
  groupId: number;
  managementId: number;
  groupMemberName: string;
}
export const RemoveGroupMember: React.FC<IProps> = ({
  open,
  handleClose,
  groupName,
  groupMemberName,
  groupId,
  managementId,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useRemoveMemberFromGroup();

  const handleDelete = () => {
    mutate(
      {
        groupId: groupId,
        managementId,
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
    <ConfirmationModal
      title="Remove Group Member"
      description={`Are you sure you want to remove ${groupMemberName} from ${groupName}`}
      handleClose={handleClose}
      open={open}
      handleConfirm={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
