import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TPayrollTemplateListData } from "features/payroll/types/template";
import { QUERY_KEY_FOR_PAYROLL_TEMPLATES } from "features/payroll/hooks/templates/useGetPayrollTemplates";
import { useDeletePayrollTemplate } from "features/payroll/hooks/templates/useDeletePayrollTemplate";

interface IProps extends IModalProps {
  data: TPayrollTemplateListData;
}
const DeletePayslipTemplate: React.FC<IProps> = ({
  open,
  handleClose,
  data,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeletePayrollTemplate();

  const handleDelete = () => {
    mutate(
      {
        templateId: data.id,
        type: "payslip",
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
            queryKey: [QUERY_KEY_FOR_PAYROLL_TEMPLATES],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete Payslip Template"
      entity={{ type: "payslip template", name: data?.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};

export default DeletePayslipTemplate;
