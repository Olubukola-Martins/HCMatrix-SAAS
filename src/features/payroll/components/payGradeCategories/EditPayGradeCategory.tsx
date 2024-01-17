import { Form, Input, InputNumber, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  numberHasToBeGreaterThanValueRule,
  numberHasToBeGreaterThanZeroRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_PAY_GRADE_CATEGORIES } from "features/payroll/hooks/payGrades/category/useGetPayGradeCategories";
import { useUpdatePayGradeCategory } from "features/payroll/hooks/payGrades/category/useUpdatePayGradeCategory";
import { TPayGradeCategory } from "features/payroll/types";

interface IProps extends IModalProps {
  category: TPayGradeCategory;
}
const EditPayGradeCategory: React.FC<IProps> = ({
  open,
  handleClose,
  category,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdatePayGradeCategory();
  const [minGrossPay, setMinGrossPay] = useState(0);

  useEffect(() => {
    if (!category) return;
    form.setFieldsValue({
      name: category.name,
      maxGrossPay: category.maxGrossPay,
      minGrossPay: category.minGrossPay,
    });
    setMinGrossPay(+category.minGrossPay);
  }, [form, category]);

  const handleSubmit = (data: any) => {
    mutate(
      {
        id: category.id,
        body: {
          name: data.name,
          maxGrossPay: data.maxGrossPay,
          minGrossPay: data.minGrossPay,
        },
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
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Edit Pay Grade Category"}
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

export default EditPayGradeCategory;
