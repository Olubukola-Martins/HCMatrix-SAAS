import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import {
  TEmployeeMedicalHistoryType,
  TSingleEmployeeHealthAccess,
} from "features/self-service/features/health-access/types/employee";
import { useRemoveEmployeeMedicalHistory } from "features/self-service/features/health-access/hooks/employee/medical/history/useRemoveEmployeeMedicalHistory";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS } from "features/self-service/features/health-access/hooks/employee/useGetSingleEmployeeHealthAccess";
import { QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_HEALTH_ACCESS } from "features/self-service/features/health-access/hooks/employee/useGetAuthenticatedEmployeeHealthAccess";

interface IProps extends IModalProps {
  data?: TSingleEmployeeHealthAccess["medicalHistory"][0];
  employeeId?: number;
  type: TEmployeeMedicalHistoryType;
}
export const DeleteMedicalCondition: React.FC<IProps> = ({
  open,
  handleClose,
  data,
  employeeId,
  type,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useRemoveEmployeeMedicalHistory();

  const handleDelete = () => {
    if (!employeeId || !data) return;
    mutate(
      {
        employeeId,
        medicalHistoryId: data.id,
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

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS, employeeId],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_HEALTH_ACCESS],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Remove Medical Condition"
      entity={{ type: "condition", name: data?.condition ?? "" }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
