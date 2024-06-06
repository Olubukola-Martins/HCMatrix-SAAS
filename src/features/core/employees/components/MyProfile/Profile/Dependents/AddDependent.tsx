import { DatePicker, Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  dateHasToBeLesserThanOrEqualToCurrentDayRule,
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import { GENDERS, RELATIONSHIPS } from "constants/general";

interface IProps extends IModalProps {
  employeeId: number;
  onSubmit: {
    fn: (data: any, successCallBack?: () => void) => void;
    isLoading?: boolean;
  };
  showGender: boolean;
  showRelationship: boolean;
}

export const AddDependent: React.FC<IProps> = ({
  open,
  handleClose,
  employeeId,
  onSubmit,
  showGender,
  showRelationship,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (data: any) => {
    onSubmit.fn(data, () => {
      form.resetFields();
      handleClose();
    });
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
          rules={[dateHasToBeLesserThanOrEqualToCurrentDayRule]}
          name="dob"
          label="Date of Birth"
        >
          <DatePicker placeholder="Date of Birth" className="w-full" />
        </Form.Item>
        <FormPhoneInput Form={Form} />
        {showRelationship && (
          <Form.Item
            name="relationship"
            label="Relationship"
            rules={generalValidationRules}
          >
            <Select options={RELATIONSHIPS} />
          </Form.Item>
        )}
        {showGender && (
          <Form.Item
            name="gender"
            label="Gender"
            rules={generalValidationRules}
          >
            <Select options={GENDERS} />
          </Form.Item>
        )}

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={onSubmit?.isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
