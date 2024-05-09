import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TRole } from "../types";
import { useDeleteRole } from "../hooks/useDeleteRole";
import { QUERY_KEY_FOR_ROLES } from "../hooks/useFetchRoles";

interface IProps extends IModalProps {
  role?: TRole;
}
export const DeleteRole: React.FC<IProps> = ({ open, handleClose, role }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteRole();

  const handleDelete = () => {
    if (!role) return;
    mutate(
      {
        id: role.id,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            // TODO: Create a function that properly locates the error message, as opposed to a validation error
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
            queryKey: [QUERY_KEY_FOR_ROLES],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Role"
      entity={{ type: "role", name: role?.name ?? "" }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
