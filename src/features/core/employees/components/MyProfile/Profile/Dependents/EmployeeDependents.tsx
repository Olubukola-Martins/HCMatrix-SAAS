import React from "react";
import { Dependents, IDependentProps } from "./Dependents";
import { generateEmployeeDependantColumns } from "./dependent-table-columns";
import { useAddEmployeeDependent } from "features/core/employees/hooks/dependents/useAddEmployeeDependent";
import { formatPhoneNumber } from "utils/dataHelpers/formatPhoneNumber";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { useUpdateEmployeeDependent } from "features/core/employees/hooks/dependents/useUpdateEmployeeDependent";
import { TSingleEmployee } from "features/core/employees/types";
import { useDeleteEmployeeDependent } from "features/core/employees/hooks/dependents/useDeleteEmployeeDependent";

const EmployeeDependents: React.FC<
  Pick<IDependentProps, "dependents" | "employeeId">
> = ({ dependents, employeeId }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isAdding } = useAddEmployeeDependent();
  const { mutate: deleteDependentMut, isLoading: isDeleting } =
    useDeleteEmployeeDependent();
  const { mutate: update, isLoading: isUpdating } =
    useUpdateEmployeeDependent();
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
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
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
        data: {
          dob: data.dob,
          fullName: data.fullName,
          phoneNumber: formatPhoneNumber({
            code: data.phone.code,
            number: data.phone.number,
          }),
          relationship: data.relationship,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
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
        data: {
          dob: data.dob,
          fullName: data.fullName,
          phoneNumber: formatPhoneNumber({
            code: data.phone.code,
            number: data.phone.number,
          }),
          relationship: data.relationship,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Dependents
      columns={generateEmployeeDependantColumns}
      dependents={dependents}
      employeeId={employeeId}
      addDependent={{ fn: addDependent, isLoading: isAdding }}
      editDependent={{ fn: editDependent, isLoading: isUpdating }}
      deleteDependent={{ fn: deleteDependent, isLoading: isDeleting }}
      showGender={false}
      showRelationship={true}
    />
  );
};

export default EmployeeDependents;
