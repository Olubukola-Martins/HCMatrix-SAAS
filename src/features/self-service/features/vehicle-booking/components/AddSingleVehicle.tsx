import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { TVehicleStatus, useCreateVehicle } from "../hooks/useCreateVehicle";
import { QUERY_KEY_FOR_VEHICLES } from "../hooks/useFetchVehicles";
import { VEHICLE_TYPES } from "./VehicleTypeCardList";
import { VEHICLE_STATUSES } from "./SelectVehicleStatus";
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

interface IProps extends IModalProps {}

const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg mb-4";
const boxTitle = "font-medium text-sm pb-1";

export const AddSingleVehicle: React.FC<IProps> = ({ handleClose, open }) => {
  const queryClient = useQueryClient();
  const [vehicleStatus, setVehicleStatus] =
    useState<TVehicleStatus>("unassigned");
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateVehicle();
  const [moreInfo, setMoreInfo] = useState(false);
  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const imageUrl = useCurrentFileUploadUrl("imageUrl");

  const handleSubmit = (data: any) => {
    mutate(
      {
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
        status: vehicleStatus,
        assigneeId: data?.assigneeId,
        documentUrls: !!documentUrl ? [documentUrl] : [],
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
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <div className={boxStyle}>
          <FileUpload
            allowedFileTypes={["image/jpeg", "image/png", "image/jpg"]}
            fileKey="imageUrl"
            textToDisplay="Upload Vehicle Image"
            displayType="icon"
          />
        </div>
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
        <Form.Item name="plateNumber" rules={textInputValidationRules}>
          <Input placeholder="Plate Number" />
        </Form.Item>

        <Form.Item
          name="status"
          rules={generalValidationRules}
          initialValue={vehicleStatus}
        >
          <Select
            value={vehicleStatus}
            placeholder="Status"
            options={VEHICLE_STATUSES.map((item) => ({
              label: item,
              value: item,
            }))}
            onSelect={(val: TVehicleStatus) => setVehicleStatus(val)}
          />
        </Form.Item>
        {vehicleStatus === "assigned" && (
          <div className={boxStyle}>
            <div className="flex items-center justify-between">
              <h5 className={boxTitle}>Assignee Information</h5>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormEmployeeInput
                Form={Form}
                control={{ name: "assigneeId", label: "" }}
              />

              <Form.Item name="dateAssigned">
                <DatePicker
                  placeholder="Date Assigned (optional)"
                  className="w-full"
                />
              </Form.Item>
            </div>
          </div>
        )}

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
              <Form.Item name="cost">
                <InputNumber placeholder="Cost(optional)" className="w-full" />
              </Form.Item>
              <Form.Item name="color">
                <Input placeholder="Color(optional)" />
              </Form.Item>
              <Form.Item name="purchaseDate">
                <DatePicker
                  placeholder="Purchase Date (optional)"
                  className="w-full"
                />
              </Form.Item>
            </div>
          )}
        </div>

        <Form.Item label="Documents">
          <FileUpload
            allowedFileTypes={[
              "image/jpeg",
              "image/png",
              "image/jpg",
              "application/pdf",
            ]}
            fileKey="documentUrl"
            textToDisplay="Upload Related Documents"
          />
        </Form.Item>
        <AppButton isLoading={isLoading} type="submit" />
      </Form>
    </Modal>
  );
};
