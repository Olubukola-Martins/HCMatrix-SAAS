import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { TTaxAuthority } from "features/payroll/types";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useDeleteNSITFAuthority } from "features/payroll/hooks/organization/nsitfAuthorities/useDeleteNSITFAuthority";
import { QUERY_KEY_FOR_NSITF_AUTHORITY } from "features/payroll/hooks/organization/nsitfAuthorities/useGetNSITFAuthorities";

interface IProps extends IModalProps {
  taxAuth: TTaxAuthority;
}
const DeleteNSITFAuth: React.FC<IProps> = ({ open, handleClose, taxAuth }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteNSITFAuthority();

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
            queryKey: [QUERY_KEY_FOR_NSITF_AUTHORITY],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete NSITF Authority"
      entity={{ type: "NSITF authority", name: taxAuth.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};

export default DeleteNSITFAuth;
