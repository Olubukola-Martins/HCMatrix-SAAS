import { DatePicker, Form, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

import { generalValidationRules } from "utils/formHelpers/validation";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { TVehicle } from "../hooks/useFetchVehicles";
import { useEditVehicle } from "../hooks/useEditVehicle";
import { QUERY_KEY_FOR_SINGLE_VEHICLE } from "../hooks/useFetchSingleVehicle";

interface IProps extends IModalProps {
  vehicle: TVehicle;
}

export const AssignVehicle: React.FC<IProps> = ({
  open,
  handleClose,
  vehicle,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useEditVehicle();

  const handleSubmit = (values: any) => {
    const data = vehicle;
    mutate(
      {
        data: {
          type: data?.type,
          brand: data?.brand,
          model: data?.model,
          plateNumber: data?.plateNumber,
          imageUrl: data.imageUrl,
          color: data?.color,
          description: data?.description,
          purchaseDate: data?.purchaseDate,
          dateAssigned: values.dateAssigned,
          cost: data?.cost,
          status: data.status,
          assigneeId: values.assigneeId,
          documentUrls: data.documentUrls,
        },
        id: vehicle.id,
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
      title={"Assign User"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <FormEmployeeInput
          Form={Form}
          control={{ label: "Assignee", name: "assigneeId" }}
        />
        <Form.Item
          rules={generalValidationRules}
          name="dateAssigned"
          label="Date assigned"
        >
          <DatePicker placeholder="Date assigned" className="w-full" />
        </Form.Item>
        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
