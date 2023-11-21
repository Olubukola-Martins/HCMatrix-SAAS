import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { THospitalCategory } from "features/self-service/features/health-access/types/hospital/category";
import { useUpdateHospitalCategory } from "features/self-service/features/health-access/hooks/hospital/category/useUpdateHospitalCategory";
import { QUERY_KEY_FOR_HOSPITAL_CATEGORIES } from "features/self-service/features/health-access/hooks/hospital/category/useGetHospitalCategories";

interface IProps extends IModalProps {
  hospitalCategory?: THospitalCategory;
}

export const EditHospitalCategory: React.FC<IProps> = ({
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

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useUpdateHospitalCategory();

  const handleSubmit = (data: any) => {
    if (!hospitalCategory) return;
    mutate(
      {
        categoryId: hospitalCategory?.id,
        body: {
          name: data.name,
          description: data.description,
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
            queryKey: [QUERY_KEY_FOR_HOSPITAL_CATEGORIES],
            // exact: true,
          });
        },
      }
    );
  };

  if (!hospitalCategory) return null;

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Edit Hospital Category"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        requiredMark={false}
        onFinish={handleSubmit}
        disabled
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
        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
