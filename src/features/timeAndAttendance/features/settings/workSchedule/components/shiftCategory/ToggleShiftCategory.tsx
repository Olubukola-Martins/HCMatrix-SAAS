import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import ConfirmationModal from "components/modals/ConfirmationModal";
import { useToogleWorkSheduleShiftCategory } from "../../hooks/shift/categories/useToogleWorkSheduleShiftCategory";
import { TWorkSheduleShiftCategory } from "../../types";
import { QUERY_KEY_WORK_SCHEDULE_SHIFT_CATEGORIES } from "../../hooks/shift/categories/useGetWorkSheduleShiftCategories";

interface IProps extends IModalProps {
  data: Pick<TWorkSheduleShiftCategory, "id" | "isEnabled" | "name">;
}

export const ToggleShiftCategory: React.FC<IProps> = ({
  open,
  handleClose,
  data,
}) => {
  const queryClient = useQueryClient();
  const { id, isEnabled, name } = data;
  const title = isEnabled ? "Disable Shift Category" : "Enable Shift Category";
  const description = `Are you sure you want to ${
    isEnabled ? "disable" : "enable"
  } ${name} shift type?`;
  const { mutate, isLoading } = useToogleWorkSheduleShiftCategory();

  const handleDelete = () => {
    mutate(
      {
        id,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
            description:
              err?.response?.data?.message ??
              err?.response?.data?.error?.message ??
              "An unexpected error occurred.",
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description:
              res?.data?.message ?? "Shift category updated successfully",
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_WORK_SCHEDULE_SHIFT_CATEGORIES],
          });

          handleClose();
        },
      }
    );
  };

  return (
    <ConfirmationModal
      title={title}
      description={description}
      handleClose={handleClose}
      open={open}
      handleConfirm={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
