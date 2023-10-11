import { Form, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";

import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_LIST_OF_EMPLOYEES } from "features/core/employees/hooks/useFetchEmployees";

import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";
import { FormEmployeeInput } from "../../FormEmployeeInput";
import { useHandleEmployeeBulkAction } from "features/core/employees/hooks/bulkActions/useHandleEmployeeBulkAction";

interface IProps extends IModalProps {
  employeeIds: number[];
}

export const BulkAssignLineManager: React.FC<IProps> = ({
  open,
  handleClose,
  employeeIds,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useHandleEmployeeBulkAction();

  const handleSubmit = (data: any) => {
    mutate(
      {
        action: "assign-line-manager",
        data: {
          lineManagerId: data.lineManagerId,
          employeeIds,
        },
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
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Assign Line Manager"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <FormEmployeeInput
          Form={Form}
          control={{
            name: "lineManagerId",
            label: `Select the new line manager of ${pluralOrSingular({
              amount: employeeIds.length,
              plural: "employees",
              singular: "employee",
            })}`,
          }}
        />

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
