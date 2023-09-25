import React from "react";
import { IModalProps } from "types";

import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_PAY_GRADES } from "features/payroll/hooks/payGrades/useGetPayGrades";
import { TPayGrade } from "features/payroll/types";
import { useDeletePayGrade } from "features/payroll/hooks/payGrades/useDeletePayGrade";
import DeleteEntityModal from "components/entity/DeleteEntityModal";

interface IProps extends IModalProps {
  grade: TPayGrade;
}
const DeletePayGrade: React.FC<IProps> = ({ open, handleClose, grade }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeletePayGrade();

  const handleDelete = () => {
    mutate(
      {
        id: grade.id,
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
            queryKey: [QUERY_KEY_FOR_PAY_GRADES],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete Pay Grade"
      entity={{ type: "pay grade", name: grade.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};

export default DeletePayGrade;
