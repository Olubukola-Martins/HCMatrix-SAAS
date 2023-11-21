import { Form, Input, InputNumber, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import {
  numberHasToBeAWholeNumberRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useAddHMOPlan } from "../../../hooks/hmoPlan/useAddHMOPlan";
import { QUERY_KEY_FOR_HMO_PLANS } from "../../../hooks/hmoPlan/useGetHMOPlans";

export const AddHMOPlan: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useAddHMOPlan();

  const handleSubmit = (data: any) => {
    mutate(
      {
        maxDependents: data.maxDependents,
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
            queryKey: [QUERY_KEY_FOR_HMO_PLANS],
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
      title={"Add HMO Plan"}
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
          rules={[numberHasToBeAWholeNumberRule]}
          name="maxDependents"
          label="Max Dependents"
        >
          <InputNumber placeholder="Max Dependents" className="w-full" />
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

export const AddHMOPlanBtn = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AddHMOPlan open={open} handleClose={() => setOpen(false)} />
      <AppButton
        handleClick={() => {
          setOpen(true);
        }}
        label="Add HMO Plan"
      />
    </>
  );
};
