import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TEmployeeHealthAccess } from "../../types/employee";
import { useRemoveEmployeeHealthAccess } from "../../hooks/employee/useRemoveEmployeeHealthAccess";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { QUERY_KEY_FOR_EMPLOYEE_HEALTH_ACCESSES } from "../../hooks/employee/useGetEmployeeHealthAccesses";

interface IProps extends IModalProps {
  healthAccess?: TEmployeeHealthAccess;
}
export const RemoveEmployeeHealthAccess: React.FC<IProps> = ({
  open,
  handleClose,
  healthAccess,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useRemoveEmployeeHealthAccess();
  const handleDelete = () => {
    if (!healthAccess) return;
    mutate(
      {
        employeeId: healthAccess.employeeId,
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
            queryKey: [QUERY_KEY_FOR_EMPLOYEE_HEALTH_ACCESSES],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Employee Health Access"
      entity={{
        type: "health access",
        name: getEmployeeFullName(healthAccess?.employee),
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
