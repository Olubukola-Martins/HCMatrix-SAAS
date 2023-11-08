import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";
import { QUERY_KEY_FOR_ONBOARDING } from "../hooks/useFetchAllOnboarding";
import { useCompleteOnboardings } from "../hooks/useCompleteOnboarding";

interface IProps extends IModalProps {
  ids: number[];
}

export const MarkSelectedOnboardingAsCompleted: React.FC<IProps> = ({
  open,
  handleClose,
  ids,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCompleteOnboardings();

  const handleSubmit = () => {
    mutate(
      {
        onboardingIds: ids,
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
          amount: ids.length,
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
