import { Form, Input, InputNumber, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import {
  numberHasToBeGreaterThanValueRule,
  numberHasToBeGreaterThanZeroRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useCreatePayGradeCategory } from "features/payroll/hooks/payGrades/category/useCreatePayGradeCategory";
import { QUERY_KEY_FOR_PAY_GRADE_CATEGORIES } from "features/payroll/hooks/payGrades/category/useGetPayGradeCategories";

const CreatePayGradeCategory: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreatePayGradeCategory();

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
        maxGrossPay: data.maxGrossPay,
        minGrossPay: data.minGrossPay,
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
            queryKey: [QUERY_KEY_FOR_PAY_GRADE_CATEGORIES],
            // exact: true,
          });
        },
      }
    );
  };
  const [minGrossPay, setMinGrossPay] = useState(0);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Create Pay Grade Category"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="Category Name" />
        </Form.Item>
        <Form.Item
          rules={[numberHasToBeGreaterThanZeroRule]}
          name="minGrossPay"
          label="Min Gross Pay"
        >
          <InputNumber
            min={0}
            className="w-full"
            onChange={(val) => setMinGrossPay(val ?? 0)}
            placeholder="Min Gross Pay"
          />
        </Form.Item>
        <Form.Item
          rules={[numberHasToBeGreaterThanValueRule(minGrossPay)]}
          name="maxGrossPay"
          label="Max Gross Pay"
        >
          <InputNumber min={0} className="w-full" placeholder="Max Gross Pay" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};

export default CreatePayGradeCategory;
