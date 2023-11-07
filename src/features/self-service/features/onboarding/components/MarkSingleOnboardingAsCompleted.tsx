import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { QUERY_KEY_FOR_ONBOARDING } from "../hooks/useFetchAllOnboarding";
import { TOnboarding } from "../types";
import { useCompleteOnboarding } from "../hooks/useCompleteOnboarding";
import { QUERY_KEY_FOR_SINGLE_ONBOARDING } from "../hooks/useFetchSingleOnboarding";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

interface IProps extends IModalProps {
  onboarding?: TOnboarding;
}

export const MarkSingleOnboardingAsCompleted: React.FC<IProps> = ({
  open,
  handleClose,
  onboarding,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCompleteOnboarding();

  const handleSubmit = () => {
    if (!onboarding) return;
    mutate(
      {
        onboardingId: onboarding.id,
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
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_ONBOARDING],
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
        description={`Are you sure you want to complete ${getEmployeeFullName(
          onboarding?.employee
        )}'s onboarding?`}
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
