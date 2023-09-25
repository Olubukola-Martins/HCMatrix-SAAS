import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TLoanType } from "../../../types";
import { useDeleteLoanType } from "../../../hooks/type/useDeleteLoanType";
import { QUERY_KEY_FOR_LOAN_TYPES } from "../../../hooks/type/useGetLoanTypes";

interface IProps extends IModalProps {
  type: TLoanType;
}
export const DeleteLoanType: React.FC<IProps> = ({
  open,
  handleClose,
  type,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteLoanType();

  const handleDelete = () => {
    mutate(
      {
        id: type.id,
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
            queryKey: [QUERY_KEY_FOR_LOAN_TYPES],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Loan Type"
      entity={{ type: "type", name: type.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
