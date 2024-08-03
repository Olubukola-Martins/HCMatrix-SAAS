import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { TWorkSheduleShiftCategory } from "../../types";
import { useSaveMultipleWorkSheduleCategories } from "../../hooks/shift/categories/useSaveMultipleWorkSheduleCategories";
import { QUERY_KEY_WORK_SCHEDULE_SHIFT_CATEGORIES } from "../../hooks/shift/categories/useGetWorkSheduleShiftCategories";

interface IProps extends IModalProps {
  category?: TWorkSheduleShiftCategory;
}

export const EditShiftCategory: React.FC<IProps> = ({
  open,
  handleClose,
  category,
}) => {
  const [form] = Form.useForm<Pick<TWorkSheduleShiftCategory, "name">>();
  useEffect(() => {
    form.setFieldsValue({
      name: category?.name,
    });
  }, [category, form]);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useSaveMultipleWorkSheduleCategories();

  const handleSubmit = (data: any) => {
    if (!category) return;
    mutate(
      [
        {
          name: data.name,
          id: category.id,
        },
      ],
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
            queryKey: [QUERY_KEY_WORK_SCHEDULE_SHIFT_CATEGORIES],
            // exact: true,
          });
        },
      }
    );
  };

  if (!category) return null;

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Edit Shift Category"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        requiredMark={false}
        onFinish={handleSubmit}
      >
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
