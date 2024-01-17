import { Form, Input, Modal, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { ICreateDegProps, TDesignation } from "../types";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";

interface IProps extends IModalProps {
  designation?: TDesignation;
  action?: "add" | "edit" | "view";
  title?: string;
  onSubmit?: {
    fn: (data: ICreateDegProps) => void;
    isLoading?: boolean;
    isSuccess?: boolean;
  };
  loading?: boolean;
}

export const SaveDesignation: React.FC<IProps> = ({
  open,
  handleClose,
  action = "add",
  designation,
  title = "Add Designation",
  onSubmit,
  loading,
}) => {
  const [form] = Form.useForm<ICreateDegProps>();

  const handleSubmit = (data: ICreateDegProps) => {
    onSubmit?.fn({
      ...data,
    });
  };

  useEffect(() => {
    if (onSubmit?.isSuccess) {
      form.resetFields();
    }
  }, [form, onSubmit?.isSuccess]);

  useEffect(() => {
    if (designation) {
      form.setFieldsValue({ ...designation });
    }
  }, [designation, form]);

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={title}
      style={{ top: 20 }}
    >
      <Skeleton loading={loading} active paragraph={{ rows: 12 }}>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          requiredMark={false}
          disabled={action === "view"}
        >
          <Form.Item
            name="name"
            label="Designation Name"
            rules={textInputValidationRules}
          >
            <Input placeholder="Designation" />
          </Form.Item>

          <FormDepartmentInput
            Form={Form}
            control={{ name: "departmentId", label: "Department" }}
          />

          <AppButton
            type="submit"
            label="Submit"
            isLoading={onSubmit?.isLoading}
          />
        </Form>
      </Skeleton>
    </Modal>
  );
};
