import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { useDeleteFolder } from "features/self-service/features/documents/hooks/useDeleteFolder";
import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";
import { QUERY_KEY_FOR_ONBOARDING } from "../hooks/useFetchAllOnboarding";

interface IProps extends IModalProps {
  employeeIds: number[];
}

export const MarkSelectedOnboardingAsCompleted: React.FC<IProps> = ({
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
            queryKey: [QUERY_KEY_FOR_ONBOARDING],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <>
      <ConfirmationModal
        title={`Mark as completed`}
        description={`Are you sure you want to complete ${pluralOrSingular({
          amount: employeeIds.length,
          plural: "employee onboardings",
          singular: "employee onboarding",
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
