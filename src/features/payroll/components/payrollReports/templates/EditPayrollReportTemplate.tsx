import { Form, Input, InputNumber, Modal, Slider } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_PAY_GRADES } from "features/payroll/hooks/payGrades/useGetPayGrades";

import { useUpdatePayGrade } from "features/payroll/hooks/payGrades/useUpdatePayGrade";

interface IProps extends IModalProps {
  template: any;
}
const EditPayrollReportTemplate: React.FC<IProps> = ({
  open,
  handleClose,
  template,
}) => {
  const queryClient = useQueryClient();
  const [categoryRange, setCategoryRange] = useState<{
    min: number;
    max: number;
  }>({ min: 0, max: 0 });

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdatePayGrade();

  useEffect(() => {
    form.setFieldsValue({
      categoryId: template.categoryId,
      grossPay: template.grossPay,
      name: template.name,
    });
    setCategoryRange({
      max: +template.category.maxGrossPay,
      min: +template.category.minGrossPay,
    });
  }, [form, template]);

  const handleSubmit = (data: any) => {
    mutate(
      {
        id: template.id,
        body: {
          categoryId: data.categoryId,
          grossPay: data.grossPay,
          name: data.name,
        },
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
        rules={generalValidationRules}
        name="grossPay"
        label="Gross Pay"
      >
        <InputNumber
          min={categoryRange.min}
          max={categoryRange.max}
          placeholder="Gross Pay"
          className="w-2/4"
        />
      </Form.Item>
      <Form.Item rules={generalValidationRules} name="grossPay">
        <Slider min={categoryRange.min} max={categoryRange.max} />
      </Form.Item>

      <div className="flex justify-end">
        <AppButton type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};

export default EditPayrollReportTemplate;
