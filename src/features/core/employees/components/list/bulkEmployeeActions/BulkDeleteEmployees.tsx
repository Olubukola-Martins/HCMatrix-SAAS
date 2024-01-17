import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { QUERY_KEY_FOR_LIST_OF_EMPLOYEES } from "features/core/employees/hooks/useFetchEmployees";
import { useDeleteFolder } from "features/self-service/features/documents/hooks/useDeleteFolder";
import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";

interface IProps extends IModalProps {
  employeeIds: number[];
}

export const BulkDeleteEmployees: React.FC<IProps> = ({
  open,
  handleClose,
  employeeIds,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteFolder();

  const handleSubmit = () => {
    mutate(
      {
        id: 0, //TODO: Correct when endpoint is ready
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
        onSuccess: (res) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LIST_OF_EMPLOYEES],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <>
      <ConfirmationModal
        title={`Delete Employees`}
        description={`Are you sure you want to delete ${pluralOrSingular({
          amount: employeeIds.length,
          plural: "employees",
          singular: "employee",
        })}?`}
        handleClose={handleClose}
        open={open}
        handleConfirm={{
          fn: () => handleSubmit(),
          isLoading: isLoading,
        }}
      />
    </>
  );
};
