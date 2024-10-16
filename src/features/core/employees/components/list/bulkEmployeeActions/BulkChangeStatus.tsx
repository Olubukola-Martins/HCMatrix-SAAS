import { Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_LIST_OF_EMPLOYEES } from "features/core/employees/hooks/useFetchEmployees";
import { useCreateFolder } from "features/self-service/features/documents/hooks/useCreateFolder";
import { EMPLOYEE_STATUSES_OPTIONS } from "features/core/employees/constants";
import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";
import { useHandleEmployeeBulkAction } from "features/core/employees/hooks/bulkActions/useHandleEmployeeBulkAction";

interface IProps extends IModalProps {
  employeeIds: number[];
}

export const BulkChangeStatus: React.FC<IProps> = ({
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
        action: "change-status",
        data: {
          status: data.status,
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
      title={"Change Employee Status"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          rules={textInputValidationRules}
          name="status"
          label={`Select the new status of ${pluralOrSingular({
            amount: employeeIds.length,
            plural: "employees",
            singular: "employee",
          })}`}
          //   className="capitalize"
        >
          <Select
            placeholder="Employee Status"
            options={EMPLOYEE_STATUSES_OPTIONS.map((item) => ({
              ...item,
              label: <span className="capitalize">{item.label}</span>,
            }))}
          />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
