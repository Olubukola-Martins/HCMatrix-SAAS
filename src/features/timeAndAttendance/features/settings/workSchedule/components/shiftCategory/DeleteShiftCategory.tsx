import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TWorkSheduleShiftCategory } from "../../types";
import { useDeleteWorkSheduleShiftCategory } from "../../hooks/shift/categories/useDeleteWorkSheduleShiftCategory";
import { QUERY_KEY_WORK_SCHEDULE_SHIFT_CATEGORIES } from "../../hooks/shift/categories/useGetWorkSheduleShiftCategories";

interface IProps extends IModalProps {
  category?: TWorkSheduleShiftCategory;
}
export const DeleteShiftCategory: React.FC<IProps> = ({
  open,
  handleClose,
  category,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteWorkSheduleShiftCategory();
  const handleDelete = () => {
    if (!category) return;
    mutate(
      {
        id: category.id,
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
            queryKey: [QUERY_KEY_WORK_SCHEDULE_SHIFT_CATEGORIES],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Shift Tyep"
      entity={{
        type: "shift type",
        name: category?.name ?? "",
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
