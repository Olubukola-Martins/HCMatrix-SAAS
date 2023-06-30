import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

const AddProject: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  //   const { mutate, isLoading } = useCreateAssetType(); -> add projects

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
      title={"New Project"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        // onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          rules={textInputValidationRules}
          name="name"
          label="Project Name"
        >
          <Input placeholder="Project Name" />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            rules={generalValidationRules}
            name="sta"
            label="Start Date"
          >
            <DatePicker placeholder="Start Date" className="w-full" />
          </Form.Item>
          <Form.Item rules={generalValidationRules} name="end" label="End Date">
            <DatePicker placeholder="End Date" className="w-full" />
          </Form.Item>
        </div>
        <Form.Item
          rules={textInputValidationRules}
          name="description"
          label="Description"
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="participants"
          label="Participants"
        >
          <span>
            should contain a form with participant name and role [project
            manager, member,]
          </span>
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

export default AddProject;
