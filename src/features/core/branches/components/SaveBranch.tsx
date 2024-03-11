import { Form, Input, Modal, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";

import { TBranch, TCreateBranchProps } from "../types";

import { FormAddressInput } from "components/generalFormInputs/FormAddressInput";

interface IProps extends IModalProps {
  branch?: TBranch;
  action?: "add" | "edit" | "view";
  title?: string;
  onSubmit?: {
    fn: (data: TCreateBranchProps) => void;
    isLoading?: boolean;
    isSuccess?: boolean;
  };
  loading?: boolean;
}

export const SaveBranch: React.FC<IProps> = ({
  open,
  handleClose,
  action = "add",
  branch,
  title = "Add Branch",
  onSubmit,
  loading,
}) => {
  const [form] = Form.useForm<TCreateBranchProps>();

  const handleSubmit = (data: TCreateBranchProps) => {
    onSubmit?.fn({
      ...data,
      address: { ...data.address, lgaId: data?.address?.lgaId ?? undefined },
    });
  };

  useEffect(() => {
    if (onSubmit?.isSuccess) {
      form.resetFields();
    }
  }, [form, onSubmit?.isSuccess]);

  useEffect(() => {
    if (branch) {
      form.setFieldsValue({
        ...branch,
        address: {
          timezone: branch?.address?.timezone,
          streetAddress: branch?.address?.streetAddress,
          countryId: branch?.address?.countryId,
          stateId: branch?.address?.stateId,
          lgaId: branch?.address?.lgaId,
          latitude: branch?.address?.latitude,
          longitude: branch?.address?.longitude,
        },
      });
    }
  }, [branch, form]);

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
          <Form.Item rules={textInputValidationRules} name="name" label="Name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            rules={textInputValidationRules}
            name="description"
            label="Description"
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>

          {/* TODO: Create a reusable address form component */}
          <>
            {" "}
            <FormAddressInput
              Form={Form}
              form={form}
              disabled={action === "view"}
            />
          </>

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
