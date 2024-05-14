import { Form,  } from "antd";
import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_LIST_OF_EMPLOYEES } from "features/core/employees/hooks/useFetchEmployees";
import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";
import { useHandleEmployeeBulkAction } from "features/core/employees/hooks/bulkActions/useHandleEmployeeBulkAction";
import { QUERY_KEY_FOR_ROLES } from "features/core/roles-and-permissions/hooks/useFetchRoles";
import ConfirmationModal from "components/modals/ConfirmationModal";

interface IProps extends IModalProps {
  employeeIds: number[];
}

export const BulkSendVerification: React.FC<IProps> = ({
  open,
  handleClose,
  employeeIds,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useHandleEmployeeBulkAction();

  const handleSubmit = () => {
    mutate(
      {
        action: "send-verification-to-unverified",
        data: undefined,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
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
          form.resetFields();
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LIST_OF_EMPLOYEES],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ROLES],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <ConfirmationModal
    title={`Send Verification`}
    description={`Are you sure you want to send verification to ${pluralOrSingular({
      amount: employeeIds.length,
      plural: "employees",
      singular: "employee",
    })}?`}
    handleClose={handleClose}
    open={open}
    handleConfirm={{
      fn: () => handleSubmit(),
      isLoading: isLoading,
    }}
  />
  );
};
