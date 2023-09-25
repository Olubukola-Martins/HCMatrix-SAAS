import React from "react";
import { IModalProps } from "types";

import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TPayrollReport } from "features/payroll/types/payroll/report";
import { QUERY_KEY_FOR_PAYROLL_REPORTS } from "features/payroll/hooks/payroll/report/useGetPayrollReports";
import { useDeletePayrollReport } from "features/payroll/hooks/payroll/report/useDeletePayrollReport";

interface IProps extends IModalProps {
  category: TPayrollReport;
}
const DeletePayrollReport: React.FC<IProps> = ({
  open,
  handleClose,
  category,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeletePayrollReport();

  const handleDelete = () => {
    mutate(
      {
        reportId: category.id,
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
            queryKey: [QUERY_KEY_FOR_PAYROLL_REPORTS],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete Payroll Report"
      entity={{ type: "payroll report", name: category.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};

export default DeletePayrollReport;
