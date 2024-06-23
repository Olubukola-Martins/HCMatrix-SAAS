import React from "react";
import { formatPhoneNumber } from "utils/dataHelpers/formatPhoneNumber";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { TSingleEmployee } from "features/core/employees/types";
import {
  Dependents,
  IDependentProps,
} from "features/core/employees/components/MyProfile/Profile/Dependents/Dependents";
import { generateEmployeeHealthAccessDependantColumns } from "features/core/employees/components/MyProfile/Profile/Dependents/dependent-table-columns";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS } from "features/self-service/features/health-access/hooks/employee/useGetSingleEmployeeHealthAccess";
import { useAddDependantInEmployeeHealthAccess } from "features/self-service/features/health-access/hooks/employee/dependent/useAddDependantInEmployeeHealthAccess";
import { useRemoveDependantInEmployeeHealthAccess } from "features/self-service/features/health-access/hooks/employee/dependent/useRemoveDependantInEmployeeHealthAccess";
import { useUpdateDependantInEmployeeHealthAccess } from "features/self-service/features/health-access/hooks/employee/dependent/useUpdateDependantInEmployeeHealthAccess";
import { QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_HEALTH_ACCESS } from "features/self-service/features/health-access/hooks/employee/useGetAuthenticatedEmployeeHealthAccess";

const EmployeeHealthAccessDependents: React.FC<
  Pick<IDependentProps, "dependents" | "employeeId">
> = ({ dependents, employeeId }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isAdding } =
    useAddDependantInEmployeeHealthAccess();
  const { mutate: deleteDependentMut, isLoading: isDeleting } =
    useRemoveDependantInEmployeeHealthAccess();
  const { mutate: update, isLoading: isUpdating } =
    useUpdateDependantInEmployeeHealthAccess();
  const deleteDependent = (
    dependent: TSingleEmployee["dependents"][0],
    successCallBack?: () => void
  ) => {
    if (!employeeId) return;
    deleteDependentMut(
      {
        dependentId: dependent.id,
        employeeId,
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
          successCallBack?.();
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS, employeeId],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_HEALTH_ACCESS],
            // exact: true,
          });
        },
      }
    );
  };
  const editDependent = (
    dependent: TSingleEmployee["dependents"][0],
    data: any,
    successCallBack?: () => void
  ) => {
    if (!employeeId) return;
    update(
      {
        employeeId,
        dependentId: dependent.id,
        body: {
          dob: data.dob,
          fullName: data.fullName,
          phoneNumber: formatPhoneNumber({
            code: data?.phone?.code,
            number: data?.phone.number,
          }),
          gender: data.gender,
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
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
          successCallBack?.();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS, employeeId],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_HEALTH_ACCESS],
            // exact: true,
          });
        },
      }
    );
  };
  const addDependent = (data: any, successCallBack?: () => void) => {
    if (!employeeId) return;
    mutate(
      {
        employeeId,
        body: {
          dob: data.dob,
          fullName: data.fullName,
          phoneNumber: formatPhoneNumber({
            code: data?.phone?.code,
            number: data?.phone.number,
          }),
          gender: data.gender,
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
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
          successCallBack?.();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS, employeeId],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_HEALTH_ACCESS],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Dependents
      columns={generateEmployeeHealthAccessDependantColumns}
      dependents={dependents}
      employeeId={employeeId}
      addDependent={{ fn: addDependent, isLoading: isAdding }}
      editDependent={{ fn: editDependent, isLoading: isUpdating }}
      deleteDependent={{ fn: deleteDependent, isLoading: isDeleting }}
      showGender={true}
      showRelationship={false}
    />
  );
};

export default EmployeeHealthAccessDependents;
