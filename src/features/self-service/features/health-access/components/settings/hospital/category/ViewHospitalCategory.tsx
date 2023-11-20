import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { THospitalCategory } from "features/self-service/features/health-access/types/hospital/category";

interface IProps extends IModalProps {
  hospitalCategory?: THospitalCategory;
}

export const ViewHospitalCategory: React.FC<IProps> = ({
  open,
  handleClose,
  hospitalCategory,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: hospitalCategory?.name,
      description: hospitalCategory?.description,
    });
  }, [hospitalCategory, form]);

  if (!hospitalCategory) return null;

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Hospital Category"}
      style={{ top: 20 }}
    >
      <Form layout="vertical" form={form} requiredMark={false} disabled>
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
      </Form>
    </Modal>
  );
};
