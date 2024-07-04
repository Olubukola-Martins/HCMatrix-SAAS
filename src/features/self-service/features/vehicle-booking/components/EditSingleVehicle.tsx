import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
} from "antd";
import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";

import { QUERY_KEY_FOR_VEHICLES, TVehicle } from "../hooks/useFetchVehicles";
import { VEHICLE_TYPES } from "./VehicleTypeCardList";
import { VEHICLE_STATUSES } from "./SelectVehicleStatus";

import { useEditVehicle } from "../hooks/useEditVehicle";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { AppButton } from "components/button/AppButton";
import dayjs from "dayjs";
import { FormFileInput } from "components/generalFormInputs/FormFileInput";
import { FormColorInput } from "components/generalFormInputs/FormColorInput";

interface IProps extends IModalProps {
  vehicle: TVehicle;
}

const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg mb-4";
const boxTitle = "font-medium text-sm pb-1";

export const EditSingleVehicle: React.FC<IProps> = ({
  handleClose,
  open,
  vehicle,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useEditVehicle();
  const [moreInfo, setMoreInfo] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      type: vehicle.type,
      brand: vehicle.brand,
      model: vehicle.model,
      plateNumber: vehicle.plateNumber,
      imageUrl: vehicle.imageUrl,
      color: vehicle.color,
      description: vehicle.description,
      purchaseDate: vehicle.purchaseDate ? dayjs(vehicle.purchaseDate) : null,
      cost: vehicle.cost,
      status: vehicle.status,
      assigneeId: vehicle.assigneeId,
    });
  }, [form, vehicle]);

  const handleSubmit = (data: any) => {
    mutate(
      {
        data: {
          type: data?.type,
          brand: data?.brand,
          model: data?.model,
          plateNumber: data?.plateNumber,
          image: data?.image,
          color: data?.color,
          description: data?.description,
          purchaseDate: data?.purchaseDate,
          cost: data?.cost,
          status: data?.status ?? vehicle?.status,

          documents: data?.documents,
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
      title={"Edit Vehicle"}
      style={{ top: 10 }}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <FormFileInput
          Form={Form}
          ruleOptions={{
            required: true,

            allowedFileTypes: ["image/jpeg", "image/png", "image/jpg"],
          }}
          label="Upload Vehicle Image"
          name={"image"}
        />
        <Form.Item name="type" label="Type" rules={generalValidationRules}>
          <Select
            placeholder="Vehicle Type"
            options={VEHICLE_TYPES.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </Form.Item>
        <Form.Item name="brand" label="Brand" rules={textInputValidationRules}>
          <Input placeholder="Vehicle Brand" />
        </Form.Item>
        <Form.Item name="model" label="Model" rules={textInputValidationRules}>
          <Input placeholder="Vehicle Model" />
        </Form.Item>

        {/* This code ensures that a vehicle status can only be changed when it is unassigned, and it can only be changed to in-repair or codendemed, but not assigned cos there is ui that does this already and user will have to assign a user */}
        {vehicle.status !== "assigned" && (
          <Form.Item name="status" rules={generalValidationRules}>
            <Select
              placeholder="Status"
              options={VEHICLE_STATUSES.filter(
                (val) => val === "in-repair" || val === "condemned"
              ).map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </Form.Item>
        )}
        <Form.Item
          name="plateNumber"
          label="Plate Number"
          rules={textInputValidationRules}
        >
          <Input placeholder="Plate Number" />
        </Form.Item>
        <div className={boxStyle}>
          <div className="flex items-center justify-between">
            <h5 className={boxTitle}>Additional Information (Optional)</h5>
            <Switch
              size="small"
              checked={moreInfo}
              onClick={() => setMoreInfo((val) => !val)}
            />
          </div>

          {moreInfo && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Form.Item name="cost" label="Cost">
                <InputNumber placeholder="Cost(optional)" className="w-full" />
              </Form.Item>
              <FormColorInput
                Form={Form}
                control={{ label: "Color", name: "color" }}
                showLabel={false}
                optional
              />
              <Form.Item name="purchaseDate" label="Purchase Date">
                <DatePicker
                  placeholder="Purchase Date (optional)"
                  className="w-full"
                />
              </Form.Item>
            </div>
          )}
        </div>

        <FormFileInput
          Form={Form}
          ruleOptions={{
            required: false,

            allowedFileTypes: [
              "image/jpeg",
              "image/png",
              "image/jpg",
              "application/pdf",
            ],
          }}
          multiple
          label="Documents"
          name={"documents"}
        />

        <AppButton isLoading={isLoading} type="submit" />
      </Form>
    </Modal>
  );
};
