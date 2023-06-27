import { Form, Input, Modal, Select, Slider } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

const AddPayGrade: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  //   const { mutate, isLoading } = useCreateAssetType();

  //   const handleSubmit = (data: any) => {
  //     mutate(
  //       {
  //         name: data.name,
  //       },
  //       {
  //         onError: (err: any) => {
  //           openNotification({
  //             state: "error",
  //             title: "Error Occurred",
  //             description:
  //               err?.response.data.message ?? err?.response.data.error.message,
  //           });
  //         },
  //         onSuccess: (res: any) => {
  //           openNotification({
  //             state: "success",

  //             title: "Success",
  //             description: res.data.message,
  //             // duration: 0.4,
  //           });
  //           form.resetFields();
  //           handleClose();

  //           queryClient.invalidateQueries({
  //             queryKey: [QUERY_KEY_FOR_ASSET_TYPES],
  //             // exact: true,
  //           });
  //         },
  //       }
  //     );
  //   };
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
        // onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="Category Name" />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="Category"
          label="Category"
        >
          <Select />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="Gross Pay(should be within range of selected category)"
          label="Gross Pay(should be within range of selected category)"
        >
          <Input min={0} />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton
            type="submit"
            //   isLoading={isLoading}
          />
        </div>
      </Form>
    </Modal>
  );
};

export default AddPayGrade;
