import React from "react";
import { IModalProps } from "types";

import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { QUERY_KEY_FOR_PAY_GRADE_CATEGORIES } from "features/payroll/hooks/payGrades/category/useGetPayGradeCategories";
import { TPayrollTemplateListData } from "features/payroll/types/template";
import { useDeletePayrollTemplate } from "features/payroll/hooks/templates/useDeletePayrollTemplate";
import { QUERY_KEY_FOR_PAYROLL_TEMPLATES } from "features/payroll/hooks/templates/useGetPayrollTemplates";

interface IProps extends IModalProps {
  data: TPayrollTemplateListData;
}
const DeletePayrollReportTemplate: React.FC<IProps> = ({
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
        type: "payroll",
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
      title="Delete Payroll Report Template"
      entity={{ type: "payroll report template", name: data?.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};

export default DeletePayrollReportTemplate;
