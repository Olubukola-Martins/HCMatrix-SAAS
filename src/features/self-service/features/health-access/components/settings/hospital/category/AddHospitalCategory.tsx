import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import {
  textInputValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useAddHospitalCategory } from "features/self-service/features/health-access/hooks/hospital/category/useAddHospitalCategory";
import { QUERY_KEY_FOR_HOSPITAL_CATEGORIES } from "features/self-service/features/health-access/hooks/hospital/category/useGetHospitalCategories";

export const AddHospitalCategory: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useAddHospitalCategory();

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
        description: data.description,
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
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Add Hospital Category"}
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

        <Form.Item
          rules={textInputValidationRulesOp}
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

export const AddHospitalCategoryBtn = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AddHospitalCategory open={open} handleClose={() => setOpen(false)} />
      <AppButton
        handleClick={() => {
          setOpen(true);
        }}
        label="Add Hospital Category"
      />
    </>
  );
};
