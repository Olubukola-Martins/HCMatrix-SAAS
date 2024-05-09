import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import React from "react";
import { useQueryClient } from "react-query";

import { QUERY_KEY_FOR_SINGLE_VEHICLE } from "../hooks/useFetchSingleVehicle";
import { useCreateOrUpdateVehicleDocument } from "../hooks/useCreateOrUpdateVehicleDocument";
import { IModalProps } from "types";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { AppButton } from "components/button/AppButton";
import { FileUpload } from "components/FileUpload";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";

interface IProps extends IModalProps {
  vehicleId: number;
}

export const AddVehicleDocument: React.FC<IProps> = ({
  handleClose,
  open,
  vehicleId,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateOrUpdateVehicleDocument();
  const documentUrl = useCurrentFileUploadUrl("documentUrl");

  const handleSubmit = (data: any) => {
    mutate(
      {
        data: {
          type: data.type,
          issueDate: data.issueDate,
          expiryDate: data.expiryDate,
          reminderDays: data.reminderDays,
          cost: data.cost,
          documentUrls: !!documentUrl ? [documentUrl] : [],
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
      title={"Add Document"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item name="type" rules={textInputValidationRules}>
          <Input placeholder="Type" />
        </Form.Item>
        <Form.Item name="issueDate" rules={generalValidationRules}>
          <DatePicker placeholder="Issue Date" className="w-full" />
        </Form.Item>
        <Form.Item name="expiryDate" rules={generalValidationRules}>
          <DatePicker placeholder="Expiry Date" className="w-full" />
        </Form.Item>
        <Form.Item name="reminderDays" rules={generalValidationRules}>
          <InputNumber placeholder="Reminder Days" className="w-full" />
        </Form.Item>
        <Form.Item name="cost" rules={generalValidationRules}>
          <InputNumber placeholder="Cost" className="w-full" />
        </Form.Item>

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
