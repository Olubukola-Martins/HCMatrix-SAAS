import { Form, Input, InputNumber } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useCreatePayGradeCategory } from "features/payroll/hooks/payGrades/category/useCreatePayGradeCategory";
import { QUERY_KEY_FOR_PAY_GRADE_CATEGORIES } from "features/payroll/hooks/payGrades/category/useGetPayGradeCategories";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";

const AddPayrollReportTemplate: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
          navigate(appRoutes.addPayrollReport);

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_PAY_GRADE_CATEGORIES],
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
        <Input placeholder="Specify what info should be present in the report to be generated" />
      </Form.Item>
      <Form.Item
        rules={generalValidationRules}
        name="maxGrossPay"
        label="Max Gross Pay"
      >
        <InputNumber min={0} className="w-full" />
      </Form.Item>
      <Form.Item
        rules={generalValidationRules}
        name="minGrossPay"
        label="Min Gross Pay"
      >
        <InputNumber min={0} className="w-full" />
      </Form.Item>

      <div className="flex justify-end">
        <AppButton type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};

export default AddPayrollReportTemplate;
