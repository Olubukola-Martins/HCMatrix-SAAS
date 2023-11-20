import { Form, Input, InputNumber, Modal } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  numberHasToBeAWholeNumberRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { THMOPlan } from "../../../types/hmoPlan";
import { AppButton } from "components/button/AppButton";
import { useQueryClient } from "react-query";
import { useUpdateHMOPlan } from "../../../hooks/hmoPlan/useUpdateHMOPlan";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_HMO_PLANS } from "../../../hooks/hmoPlan/useGetHMOPlans";

interface IProps extends IModalProps {
  hmoPlan?: THMOPlan;
}

export const EditHMOPlan: React.FC<IProps> = ({
  open,
  handleClose,
  hmoPlan,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: hmoPlan?.name,
      maxDependents: hmoPlan?.maxDependents,
      description: hmoPlan?.description,
    });
  }, [hmoPlan, form]);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useUpdateHMOPlan();

  const handleSubmit = (data: any) => {
    if (!hmoPlan) return;
    mutate(
      {
        hospitalId: hmoPlan?.id,
        body: {
          maxDependents: data.maxDependents,
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
            queryKey: [QUERY_KEY_FOR_HMO_PLANS],
            // exact: true,
          });
        },
      }
    );
  };

  if (!hmoPlan) return null;

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Edit HMO Plan"}
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
          rules={[numberHasToBeAWholeNumberRule]}
          name="name"
          label="Max Dependents"
        >
          <InputNumber placeholder="maxDependents" />
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
