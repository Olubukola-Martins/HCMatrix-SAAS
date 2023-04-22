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
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { FileUpload } from "components/FileUpload";
import { AppButton } from "components/button/AppButton";

interface IProps extends IModalProps {
  vehicle: TVehicle;
}

const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
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
  const [assigneeInfo, setAssigneeInfo] = useState(false);
  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const imageUrl = useCurrentFileUploadUrl("imageUrl");

  useEffect(() => {
    form.setFieldsValue({
      type: vehicle.type,
      brand: vehicle.brand,
      model: vehicle.model,
      plateNumber: vehicle.plateNumber,
      imageUrl: vehicle.imageUrl,
      color: vehicle.color,
      description: vehicle.description,
      purchaseDate: vehicle.purchaseDate,
      dateAssigned: vehicle.dateAssigned,
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
          imageUrl: imageUrl,
          color: data?.color,
          description: data?.description,
          purchaseDate: data?.purchaseDate,
          dateAssigned: data?.dateAssigned,
          cost: data?.cost,
          status: data?.status,
          assigneeId: data?.assigneeId,
          documentUrls: !!documentUrl ? [documentUrl] : [],
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
        <Form.Item>
          <FileUpload
            allowedFileTypes={["image/jpeg", "image/png", "image/jpg"]}
            key="imageUrl"
          />
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
            <div className="grid grid-cols-2">
              <Form.Item name="cost">
                <InputNumber placeholder="Cost(optional)" />
              </Form.Item>
              <Form.Item name="color">
                <Input placeholder="Color(optional)" />
              </Form.Item>
              <Form.Item name="purchaseDate">
                <DatePicker placeholder="Purchase Date (optional)" />
              </Form.Item>
            </div>
          )}
        </div>
        <div className={boxStyle}>
          <div className="flex items-center justify-between">
            <h5 className={boxTitle}>Assignee Information (Optional)</h5>
            <Switch
              size="small"
              checked={assigneeInfo}
              onClick={() => setAssigneeInfo((val) => !val)}
            />
          </div>

          {assigneeInfo && (
            <div className="grid grid-cols-2">
              <FormEmployeeInput
                Form={Form}
                control={{ name: "assigneeId", label: "Assignee" }}
              />

              <Form.Item name="dateAssigned">
                <DatePicker placeholder="Date Assigned (optional)" />
              </Form.Item>
            </div>
          )}
        </div>
        <div>
          <FileUpload
            allowedFileTypes={[
              "image/jpeg",
              "image/png",
              "image/jpg",
              "application/pdf",
            ]}
            key="documentUrl"
          />
        </div>
        <AppButton isLoading={isLoading} type="submit" />
      </Form>
    </Modal>
  );
};
