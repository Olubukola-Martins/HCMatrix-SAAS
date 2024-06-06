import { Form, Input, InputNumber, Modal, Slider } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  numberHasToBeInRange,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useCreatePayGrade } from "features/payroll/hooks/payGrades/useCreatePayGrade";
import { QUERY_KEY_FOR_PAY_GRADES } from "features/payroll/hooks/payGrades/useGetPayGrades";
import { FormPayGradeCategoryInput } from "../payGradeCategories/FormPayGradeCategoryInput";

const AddPayGrade: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const [categoryRange, setCategoryRange] = useState<{
    min: number;
    max: number;
  }>({ min: 0, max: 0 });

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreatePayGrade();

  const handleSubmit = (data: any) => {
    mutate(
      {
        categoryId: data.categoryId,
        grossPay: data.grossPay,
        name: data.name,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
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
            queryKey: [QUERY_KEY_FOR_PAY_GRADES],
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
      title={"Add Pay Grade"}
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
        <FormPayGradeCategoryInput
          Form={Form}
          control={{ name: "categoryId", label: "Category" }}
          onSelect={(_, option) =>
            setCategoryRange({
              max: +option.maxGrossPay,
              min: +option.minGrossPay,
            })
          }
        />

        <Form.Item
          rules={[numberHasToBeInRange(categoryRange.min, categoryRange.max)]}
          name="grossPay"
          label="Gross Pay"
        >
          <InputNumber placeholder="Gross Pay" className="w-2/4" />
        </Form.Item>
        <Form.Item
          rules={[numberHasToBeInRange(categoryRange.min, categoryRange.max)]}
          name="grossPay"
        >
          <Slider min={categoryRange.min} max={categoryRange.max} />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};

export default AddPayGrade;
