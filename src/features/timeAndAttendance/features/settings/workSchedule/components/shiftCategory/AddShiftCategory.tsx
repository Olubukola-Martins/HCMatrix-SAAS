import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useCreateWorkSheduleShiftCategory } from "../../hooks/shift/categories/useCreateWorkSheduleShiftCategory";
import { QUERY_KEY_WORK_SCHEDULE_SHIFT_CATEGORIES } from "../../hooks/shift/categories/useGetWorkSheduleShiftCategories";
import { IDivProps } from "types/html";

export const AddShiftCategory: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateWorkSheduleShiftCategory();

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data?.name,
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
            description: res?.data?.message,
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
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Add Shift Type"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
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

export const AddShiftCategoryBtn: React.FC<Pick<IDivProps, "className">> = ({
  className,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={className}>
      <AddShiftCategory open={open} handleClose={() => setOpen(false)} />
      <AppButton
        handleClick={() => {
          setOpen(true);
        }}
        label="Add New"
      />
    </div>
  );
};
