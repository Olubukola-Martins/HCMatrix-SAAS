import { IModalProps } from "AppTypes/Component";
import { Form, Input, Modal, Select } from "antd";
import React from "react";
import { useQueryClient } from "react-query";
import { useCreateVehicle } from "../hooks/useCreateVehicle";
import {
  generalValidationRules,
  textInputValidationRules,
} from "FormHelpers/validation";
import { openNotification } from "NotificationHelpers";
import Button from "GeneralComps/Button";
import { QUERY_KEY_FOR_VEHICLES } from "../hooks/useFetchVehicles";
import { VEHICLE_TYPES } from "./VehicleTypeCardList";
import { VEHICLE_STATUSES } from "./SelectVehicleStatus";

interface IProps extends IModalProps {}

export const AddSingleVehicle: React.FC<IProps> = ({ handleClose, open }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateVehicle();

  const handleSubmit = (data: any) => {
    mutate(
      {
        type: data.type,
        brand: data.brand,
        model: data.model,
        plateNumber: data.plateNumber,
        imageUrl: data.imageUrl,
        color: data.color,
        description: data.description,
        purchaseDate: data.purchaseDate,
        dateAssigned: data.dateAssigned,
        cost: data.cost,
        status: data.status,
        assigneeId: data.assigneeId,
        documentUrls: data.documentUrls,
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
            queryKey: [QUERY_KEY_FOR_VEHICLES],
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
      title={"Add Vehicle"}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item name="type" rules={generalValidationRules}>
          <Select
            placeholder="Vehicle Type"
            options={VEHICLE_TYPES.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </Form.Item>
        <Form.Item name="brand" rules={textInputValidationRules}>
          <Input placeholder="Vehicle Brand" />
        </Form.Item>
        <Form.Item name="model" rules={textInputValidationRules}>
          <Input placeholder="Vehicle Model" />
        </Form.Item>
        <Form.Item name="status" rules={generalValidationRules}>
          <Select
            placeholder="Status"
            options={VEHICLE_STATUSES.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </Form.Item>
        <Form.Item name="plateNumber" rules={textInputValidationRules}>
          <Input placeholder="Plate Number" />
        </Form.Item>
        <Button isLoading={isLoading} type="submit" />
      </Form>
    </Modal>
  );
};
