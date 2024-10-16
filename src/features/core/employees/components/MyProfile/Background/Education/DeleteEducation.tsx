import React from "react";
import { IModalProps } from "types";

import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { TSingleEmployee } from "features/core/employees/types";
import { useDeleteEmployeeEducation } from "features/core/employees/hooks/educationDetail/useDeleteEmployeeEducation";

interface IProps extends IModalProps {
  educationDetail: TSingleEmployee["educationDetails"][0];
  employeeId: number;
}
export const DeleteEducation: React.FC<IProps> = ({
  open,
  handleClose,
  educationDetail,
  employeeId,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteEmployeeEducation();

  const handleDelete = () => {
    mutate(
      {
        employeeId,
        educationDetailId: educationDetail.id,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete Education"
      entity={{ type: "education", name: educationDetail.school }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
