import { Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_LIST_OF_EMPLOYEES } from "features/core/employees/hooks/useFetchEmployees";
import { useCreateFolder } from "features/self-service/features/documents/hooks/useCreateFolder";
import { EMPLOYEE_STATUSES_OPTIONS } from "features/core/employees/constants";
import { pluralOrSingular } from "utils/dataHelpers/pluralOrSingular";
import { FormEmployeeInput } from "../../FormEmployeeInput";
import { FormDesignationInput } from "features/core/designations/components/FormDesignationInput";
import { useHandleEmployeeBulkAction } from "features/core/employees/hooks/bulkActions/useHandleEmployeeBulkAction";
import { QUERY_KEY_FOR_DESIGNATIONS } from "features/core/designations/hooks/useFetchDesignations";
import { QUERY_KEY_FOR_SINGLE_DESIGNATION } from "features/core/designations/hooks/useFetchSingleDesignation";

interface IProps extends IModalProps {
  employeeIds: number[];
}

export const BulkAssignDesignation: React.FC<IProps> = ({
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
        action: "assign-designation",
        data: {
          designationId: data.designationId,
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
            queryKey: [QUERY_KEY_FOR_DESIGNATIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_DESIGNATION],
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
      title={"Assign Designation"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <FormDesignationInput
          Form={Form}
          control={{
            name: "designationId",
            label: `Select the new designation of ${pluralOrSingular({
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
