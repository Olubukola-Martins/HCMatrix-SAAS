import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  dateHasToBeGreaterThanOrEqualToCurrentDayRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

import { QUERY_KEY_FOR_ASSET_REQUISITIONS } from "../../requisitions/hooks/asset/useGetAssetRequisitions";
import { useCreateAssetRequisition } from "../../requisitions/hooks/asset/useCreateAssetRequisition";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { FormAssetInput } from "./FormAssetInput";
import { FileUpload } from "components/FileUpload";
import { boxStyle } from "styles/reused";
import { QUERY_KEY_FOR_ASSET_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../hooks/requisitions/useGetAssetRequisitions4AuthEmployee";

export const NewAssetRequest: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateAssetRequisition();
  const documentUrl = useCurrentFileUploadUrl("documentUrl");

  const handleSubmit = (data: any) => {
    mutate(
      {
        date: data.date.toString(),
        assetId: data.assetId,
        description: data.description,
        attachmentUrls: !!documentUrl ? [documentUrl] : [],
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
            queryKey: [QUERY_KEY_FOR_ASSET_REQUISITIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ASSET_REQUISITIONS_FOR_AUTH_EMPLOYEE],
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
      title={"New Asset Request"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <FormAssetInput
          Form={Form}
          control={{ name: "assetId", label: "Asset" }}
        />
        <Form.Item
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRule]}
          name="date"
          label="Date"
        >
          <DatePicker placeholder="Date" className="w-full" />
        </Form.Item>

        <Form.Item
          rules={textInputValidationRules}
          name="description"
          label="Description"
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <div className={boxStyle}>
          <FileUpload
            allowedFileTypes={[
              "image/jpeg",
              "image/png",
              "image/jpg",
              "application/pdf",
            ]}
            fileKey="documentUrl"
            textToDisplay="Upload Documents"
            displayType="form-space-between"
          />
        </div>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
