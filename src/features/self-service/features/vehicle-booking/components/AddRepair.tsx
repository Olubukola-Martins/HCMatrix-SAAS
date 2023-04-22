import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import React from "react";
import { useQueryClient } from "react-query";

import { QUERY_KEY_FOR_SINGLE_VEHICLE } from "../hooks/useFetchSingleVehicle";
import { useCreateVehicleRepair } from "../hooks/useCreateVehicleRepair";
import { IModalProps } from "types";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { AppButton } from "components/button/AppButton";

interface IProps extends IModalProps {
  vehicleId: number;
}

export const AddRepair: React.FC<IProps> = ({
  handleClose,
  open,
  vehicleId,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateVehicleRepair();

  const handleSubmit = (data: any) => {
    mutate(
      {
        data: {
          description: data.description,
          serviceDate: data.serviceDate,
          nextDueDate: data.nextDueDate,
          reminderDays: data.reminderDays,
          cost: data.cost,
          // documentUrls: data.documentUrls,
        },
        vehicleId,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_VEHICLE],
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
      title={"Add Maintenance"}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item name="description" rules={textInputValidationRules}>
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item name="serviceDate" rules={generalValidationRules}>
          <DatePicker placeholder="Service Date" />
        </Form.Item>
        <Form.Item name="nextDueDate" rules={generalValidationRules}>
          <DatePicker placeholder="Next Due Date" />
        </Form.Item>
        <Form.Item name="reminderDays" rules={generalValidationRules}>
          <InputNumber placeholder="Reminder Days" />
        </Form.Item>
        <Form.Item name="cost" rules={generalValidationRules}>
          <InputNumber placeholder="Cost" />
        </Form.Item>

        <AppButton isLoading={isLoading} type="submit" />
      </Form>
    </Modal>
  );
};
