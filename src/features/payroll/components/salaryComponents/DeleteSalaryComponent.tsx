import React from "react";
import { IModalProps } from "types";

import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { TSalaryComponent } from "features/payroll/types/salaryComponents";
import { useDeleteAllowanceOrDeduction } from "features/payroll/hooks/scheme/allowanceAndDeductionHandlers/useDeleteAllowanceOrDeduction";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { QUERY_KEY_FOR_PAYROLL_SCHEME_BY_TYPE_OR_ID } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";
import { TPayrollScheme } from "features/payroll/types/payrollSchemes";

interface IProps extends IModalProps {
  salaryComponent: TSalaryComponent;
  type?: "allowance" | "deduction";
  handleDelete?: (props: TSalaryComponent) => void;
}
const DeleteSalaryComponent: React.FC<IProps> = ({
  open,
  handleClose,
  salaryComponent,
  handleDelete: handleLocalDelete,
  type = "allowance",
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteAllowanceOrDeduction();

  const handleDelete = () => {
    if (handleLocalDelete) {
      handleLocalDelete({ ...salaryComponent });
      handleClose();
      return;
    }
    mutate(
      {
        allowanceOrDeductionId: salaryComponent.id,
        schemeId: salaryComponent.schemeId,
        type,
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

          queryClient.setQueryData(
            [QUERY_KEY_FOR_PAYROLL_SCHEME_BY_TYPE_OR_ID],
            (vals: unknown): TPayrollScheme => {
              const data = vals as TPayrollScheme;
              if (data && !Array.isArray(data) && type === "allowance") {
                return {
                  ...data,
                  allowances: data.allowances.filter(
                    (item) => item.id !== salaryComponent.id
                  ),
                };
              }
              if (data && !Array.isArray(data) && type === "deduction") {
                return {
                  ...data,
                  deductions: data.deductions.filter(
                    (item) => item.id !== salaryComponent.id
                  ),
                };
              }
              return data;
            }
          );
          handleClose();
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete Salary Component"
      entity={{ type: "salary component", name: salaryComponent.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};

export default DeleteSalaryComponent;
