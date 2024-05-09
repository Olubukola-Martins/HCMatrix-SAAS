import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useCancelRequisition } from "../../requisitions/hooks/useCancelRequisition";
import { QUERY_KEY_FOR_TRAVEL_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/travel/useGetTravelRequisitions4AuthEmployee";
import { QUERY_KEY_FOR_TRAVEL_REQUESTS } from "../../requisitions/hooks/travel/useGetTravelRequisitions";
import { TTravelRequest } from "../../requisitions/types/travel";
import { truncateString } from "utils/dataHelpers/truncateString";

interface IProps extends IModalProps {
  data?: TTravelRequest;
}
export const CancelTravelRequest: React.FC<IProps> = ({
  open,
  handleClose,
  data,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCancelRequisition();

  const handleDelete = () => {
    if (!data) return;
    mutate(
      {
        entityId: data.id,
        type: "travel",
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
            queryKey: [QUERY_KEY_FOR_TRAVEL_REQUESTS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_TRAVEL_REQUISITIONS_FOR_AUTH_EMPLOYEE],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Cancel Travel request"
      entity={{
        type: `travel request`,
        name: `${truncateString(data?.location ?? "", 18)}`,
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
