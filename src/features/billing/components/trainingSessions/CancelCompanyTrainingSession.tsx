import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { useCancelTrainingBooking } from "features/billing/hooks/addOns/trainingSession/booking/useCancelTrainingBooking";
import { TTrainingSessionBooking } from "features/billing/types/addOns/trainingSession";
import moment from "moment";

interface IProps extends IModalProps {
  booking?: Pick<TTrainingSessionBooking, "id" | "startDate" | "endDate">;
}
export const CancelCompanyTrainingSession: React.FC<IProps> = ({
  open,
  handleClose,
  booking,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCancelTrainingBooking();

  const handleDelete = () => {
    if (!booking) return;
    mutate(
      {
        id: booking.id,
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
            queryKey: [QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION],
            // exact: true,
          });
          navigate(appRoutes.billingSubscription);
          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Cancel Training Session"
      entity={{
        type: "training session",
        name: `${moment(booking?.startDate).format(
          "hh:mm a dd MMM, yyyy"
        )} - ${moment(booking?.endDate).format("hh:mm a dd MMM, yyyy")}`,
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
