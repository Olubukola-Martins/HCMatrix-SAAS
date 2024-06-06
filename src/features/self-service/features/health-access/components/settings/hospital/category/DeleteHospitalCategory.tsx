import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { THospitalCategory } from "features/self-service/features/health-access/types/hospital/category";
import { useDeleteHospitalCategory } from "features/self-service/features/health-access/hooks/hospital/category/useDeleteHospitalCategory";
import { QUERY_KEY_FOR_HOSPITAL_CATEGORIES } from "features/self-service/features/health-access/hooks/hospital/category/useGetHospitalCategories";

interface IProps extends IModalProps {
  category?: THospitalCategory;
}
export const DeleteHospitalCategory: React.FC<IProps> = ({
  open,
  handleClose,
  category,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteHospitalCategory();
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
            queryKey: [QUERY_KEY_FOR_HOSPITAL_CATEGORIES],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Hospital Category"
      entity={{
        type: "hospital category",
        name: category?.name ?? "",
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
