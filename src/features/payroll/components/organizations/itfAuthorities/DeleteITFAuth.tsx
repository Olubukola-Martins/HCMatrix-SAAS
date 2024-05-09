import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { TTaxAuthority } from "features/payroll/types";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useDeleteITFAuthority } from "features/payroll/hooks/organization/itfAuthorities/useDeleteITFAuthority";
import { QUERY_KEY_FOR_ITF_AUTHORITY } from "features/payroll/hooks/organization/itfAuthorities/useGetITFAuthorities";

interface IProps extends IModalProps {
  taxAuth: TTaxAuthority;
}
const DeleteITFAuth: React.FC<IProps> = ({ open, handleClose, taxAuth }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteITFAuthority();

  const handleDelete = () => {
    mutate(
      {
        id: taxAuth.id,
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
            queryKey: [QUERY_KEY_FOR_ITF_AUTHORITY],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete ITF Authority"
      entity={{ type: "itf authority", name: taxAuth.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};

export default DeleteITFAuth;
