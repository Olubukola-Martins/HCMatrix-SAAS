import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useCreateFolder } from "../../documents/hooks/useCreateFolder";
import { QUERY_KEY_FOR_FOLDERS } from "../../documents/hooks/useGetFolders";

export const NewLoan: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateFolder();

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
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
            queryKey: [QUERY_KEY_FOR_FOLDERS],
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
      title={"New Loan"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item rules={generalValidationRules} name="date" label="Date">
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item rules={generalValidationRules} name="type" label="Loan Type">
          <Select placeholder="Select a loan type" />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="repayment"
          label="Select Repayment"
        >
          <Select placeholder="Select a repayment" />
        </Form.Item>
        <Form.Item rules={generalValidationRules} name="amount" label="Amount">
          <InputNumber className="w-full" placeholder="Amount" />
        </Form.Item>
        <Form.Item rules={generalValidationRules} label="Loan Worthiness (Why)">
          <Input placeholder="0%" disabled />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
