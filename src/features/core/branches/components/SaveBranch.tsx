import { Form, Input, Modal, Select, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { TCreateBranchProps } from "../types";
import { FormAddressInput } from "components/generalFormInputs/FormAddressInput";
import { FormBranchInput } from "./FormBranchInput";
import { useFetchSingleBranch } from "../hooks/useFetchSingleBranch";

interface IProps extends IModalProps {
  branchId?: number;
  action?: "add" | "edit" | "view";
  title?: string;
  onSubmit?: {
    fn: (data: TCreateBranchProps) => void;
    isLoading?: boolean;
    isSuccess?: boolean;
  };
}

export const SaveBranch: React.FC<IProps> = ({
  open,
  handleClose,
  action = "add",
  branchId,
  title = "Add Branch",
  onSubmit,
}) => {
  const [form] = Form.useForm<TCreateBranchProps>();
  const { data: branch, isLoading: loading } = useFetchSingleBranch({
    branchId,
  });
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
          <FormBranchInput
            Form={Form}
            control={{ label: "Parent Branch", name: "parentBranchId" }}
            optional
          />
          {["view"].includes(action) && (
            <Form.Item label={`Child Branch(es)`}>
              <Select
                disabled
                mode="tags"
                value={branch?.childBranches?.map((item) => item.id)}
                options={branch?.childBranches?.map((item) => ({
                  label: <span className="capitalize">{item.name}</span>,
                  value: item.id,
                }))}
              />
            </Form.Item>
          )}

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
