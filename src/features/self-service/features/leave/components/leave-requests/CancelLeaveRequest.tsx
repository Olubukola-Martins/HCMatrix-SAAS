import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TLeave } from "../../types";
import { useCancelLeave } from "../../hooks/useCancelLeave";
import { QUERY_KEY_FOR_EMPLOYEE_LEAVES } from "../../hooks/useGetEmployeeLeaves";
import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";
import { QUERY_KEY_FOR_ALL_LEAVES } from "../../hooks/useGetAllLeaves";

interface IProps extends IModalProps {
  data?: TLeave;
}
export const CancelLeaveRequest: React.FC<IProps> = ({
  open,
  handleClose,
  data,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCancelLeave();

  const handleDelete = () => {
    if (!data) return;
    mutate(
      {
        id: data.id,
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
            queryKey: [QUERY_KEY_FOR_EMPLOYEE_LEAVES],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ALL_LEAVES],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Cancel Leave"
      entity={{
        type: ` leave request`,
        name: `${pluralOrSingular({
          amount: data?.length ?? 0,
          plural: "days",
          singular: "day",
        })}`,
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
