import { DatePicker, Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useAddEmployeeDependent } from "features/core/employees/hooks/dependents/useAddEmployeeDependent";
import { formatPhoneNumber } from "utils/dataHelpers/formatPhoneNumber";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import { RELATIONSHIPS } from "constants/general";

interface IProps extends IModalProps {
  employeeId: number;
}

export const AddDependent: React.FC<IProps> = ({
  open,
  handleClose,
  employeeId,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useAddEmployeeDependent();

  const handleSubmit = (data: any) => {
    mutate(
      {
        employeeId,
        data: {
          dob: data.dob,
          fullName: data.fullName,
          phoneNumber: formatPhoneNumber({
            code: data.phone.code,
            number: data.phone.number,
          }),
          relationship: data.relationship,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
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
      title={"Add Dependent"}
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
          name="fullName"
          label="Full Name"
        >
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="dob"
          label="Date of Birth"
        >
          <DatePicker placeholder="Date of Birth" className="w-full" />
        </Form.Item>
        <FormPhoneInput Form={Form} />
        <Form.Item name="relationship" label="Relationship">
          <Select options={RELATIONSHIPS} />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
