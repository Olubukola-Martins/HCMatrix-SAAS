import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";

import { TPaymentPlan } from "../../../types";
import { useDeleteLoanPaymentPlan } from "../../../hooks/paymentPlan/useDeletePaymentPlan";
import { QUERY_KEY_FOR_LOAN_PAYMENT_PLANS } from "../../../hooks/paymentPlan/useGetPaymentPlans";

interface IProps extends IModalProps {
  plan: TPaymentPlan;
}
export const DeleteRepaymentPlan: React.FC<IProps> = ({
  open,
  handleClose,
  plan,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteLoanPaymentPlan();

  const handleDelete = () => {
    mutate(
      {
        id: plan.id,
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
            queryKey: [QUERY_KEY_FOR_LOAN_PAYMENT_PLANS],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Payment Plan"
      entity={{ type: "plan", name: plan.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
