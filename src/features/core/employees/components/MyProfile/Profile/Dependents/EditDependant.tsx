import { DatePicker, Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { formatPhoneNumber } from "utils/dataHelpers/formatPhoneNumber";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import { RELATIONSHIPS } from "constants/general";
import { TSingleEmployee } from "features/core/employees/types";
import { parsePhoneNumber } from "utils/dataHelpers/parsePhoneNumber";
import moment from "moment";
import { useUpdateEmployeeDependent } from "features/core/employees/hooks/dependents/useUpdateEmployeeDependent";

interface IProps extends IModalProps {
  employeeId: number;
  dependent: TSingleEmployee["dependents"][0];
}

export const EditDependent: React.FC<IProps> = ({
  open,
  handleClose,
  employeeId,
  dependent,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateEmployeeDependent();
  useEffect(() => {
    form.setFieldsValue({
      dob: dependent.dob ? moment(dependent.dob) : null,
      fullName: dependent.fullName,
      phone: {
        code: parsePhoneNumber(dependent.phoneNumber).code,
        number: parsePhoneNumber(dependent.phoneNumber).number,
      },
      relationship: dependent.relationship,
    });
  }, [form, dependent]);

  const handleSubmit = (data: any) => {
    mutate(
      {
        employeeId,
        dependentId: dependent.id,
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
