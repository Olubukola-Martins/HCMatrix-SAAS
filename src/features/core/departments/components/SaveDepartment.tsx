import { Form, Input, Modal, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  emailValidationRules,
  emailValidationRulesOp,
  textInputValidationRules,
} from "utils/formHelpers/validation";

import { TCreateDepProps, TDepartment } from "../types";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormDepartmentInput } from "./FormDepartmentInput";

interface IProps extends IModalProps {
  department?: TDepartment;
  action?: "add" | "edit" | "view";
  title?: string;
  onSubmit?: {
    fn: (data: TCreateDepProps) => void;
    isLoading?: boolean;
    isSuccess?: boolean;
  };
  loading?: boolean;
}

export const SaveDepartment: React.FC<IProps> = ({
  open,
  handleClose,
  action = "add",
  department,
  title = "Add Department",
  onSubmit,
  loading,
}) => {
  const [form] = Form.useForm<TCreateDepProps>();

  const handleSubmit = (data: TCreateDepProps) => {
    onSubmit?.fn({
      ...data,
    });
  };

  useEffect(() => {
    if (onSubmit?.isSuccess) {
      form.resetFields();
    }
    if (department) {
      form.setFieldsValue({ ...department });
    }
  }, [form, onSubmit?.isSuccess, department]);

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
            label="Department Name"
            rules={textInputValidationRules}
          >
            <Input placeholder="Department" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Mail Alias"
            rules={emailValidationRulesOp}
          >
            <Input placeholder="john@gmail.com" />
          </Form.Item>

          <FormEmployeeInput
            Form={Form}
            control={{
              name: "departmentHeadId",
              label: "Department Head (Optional)",
            }}
            optional
          />
          <FormDepartmentInput
            Form={Form}
            control={{
              name: "parentDepartmentId",
              label: "Parent Department (Optional)",
            }}
            optional
          />

          {action !== "view" ? (
            <div className="flex justify-end">
              <AppButton type="submit" isLoading={onSubmit?.isLoading} />
            </div>
          ) : null}
        </Form>
      </Skeleton>
    </Modal>
  );
};
