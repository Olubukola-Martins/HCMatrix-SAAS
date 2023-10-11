import { Form, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";

import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_LIST_OF_EMPLOYEES } from "features/core/employees/hooks/useFetchEmployees";
import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import { useHandleEmployeeBulkAction } from "features/core/employees/hooks/bulkActions/useHandleEmployeeBulkAction";
import { QUERY_KEY_FOR_ROLES } from "features/core/roles-and-permissions/hooks/useFetchRoles";

interface IProps extends IModalProps {
  employeeIds: number[];
}

export const BulkAssignRole: React.FC<IProps> = ({
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
        action: "assign-role",
        data: {
          roleId: data.roleId,
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
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ROLES],
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
      title={"Assign Role"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <FormRoleInput
          Form={Form}
          control={{
            name: "roleId",
            label: `Select the new role of ${pluralOrSingular({
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
