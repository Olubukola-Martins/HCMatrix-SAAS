import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { TPensionAdministrator } from "features/payroll/types";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { QUERY_KEY_FOR_TAX_AUTHOTITY } from "features/payroll/hooks/organization/taxAuthorities/useGetTaxAuthorities";
import { useDeletePensionAdmin } from "features/payroll/hooks/organization/pensionAdministrators/useDeletePensionAdmin";
import { QUERY_KEY_FOR_PENSION_ADMINS } from "features/payroll/hooks/organization/pensionAdministrators/useGetPensionAdmins";

interface IProps extends IModalProps {
  pensionAdmin: TPensionAdministrator;
}
const DeletePensionAdmin: React.FC<IProps> = ({
  open,
  handleClose,
  pensionAdmin,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeletePensionAdmin();

  const handleDelete = () => {
    mutate(
      {
        id: pensionAdmin.id,
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
            queryKey: [QUERY_KEY_FOR_PENSION_ADMINS],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete Pension Administrator"
      entity={{ type: "pension administrator", name: pensionAdmin.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};

export default DeletePensionAdmin;
