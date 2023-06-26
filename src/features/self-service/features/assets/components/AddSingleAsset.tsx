import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  generalValidationRulesOp,
  textInputValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

import { useCreateAsset } from "../hooks/useCreateAsset";
import { FormAssetTypeInput } from "./FormAssetTypeInput";
import { FileUpload } from "components/FileUpload";
import { boxStyle } from "styles/reused";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { QUERY_KEY_FOR_ASSETS } from "../hooks/useGetAssets";
import { TAssetStatus } from "../types";
import { ASSET_STATUSES } from "../constants";
const boxTitle = "font-medium text-sm pb-1";
const AddSingleAsset: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const [assetStatus, setAssetStatus] = useState<TAssetStatus>("unassigned");

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateAsset();
  const imageUrl = useCurrentFileUploadUrl("imageUrl");
  const documentUrl = useCurrentFileUploadUrl("documentUrl");

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
        typeId: data.typeId,
        dateAssigned: data.dateAssigned,
        assigneeId: data.assigneeId,
        description: data.description,
        color: data.color,
        cost: data.cost,
        model: data.model,
        brand: data.brand,
        serialNumber: data.serialNumber,
        uid: data.uid,
        purchaseDate: data.purchaseDate,
        imageUrl: imageUrl,
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
            queryKey: [QUERY_KEY_FOR_ASSETS],
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
      title={"Add Asset"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <div className={boxStyle}>
          <FileUpload
            allowedFileTypes={["image/jpeg", "image/png", "image/jpg"]}
            fileKey="imageUrl"
            textToDisplay="Upload Image"
            displayType="icon"
          />
        </div>
        <FormAssetTypeInput
          Form={Form}
          control={{ name: "typeId", label: "Asset Type" }}
        />
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="Name" className="w-full" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRulesOp}
          name="uid"
          label="Unique Identifier"
        >
          <Input placeholder="Unique Identifier" className="w-full" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRulesOp}
          name="serialNumber"
          label="Serial Number"
        >
          <Input placeholder="Serial Number" className="w-full" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRulesOp}
          name="brand"
          label="Brand"
        >
          <Input placeholder="Brand" className="w-full" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRulesOp}
          name="color"
          label="Color"
        >
          <Input placeholder="Color" className="w-full" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRulesOp}
          name="vendor"
          label="Vendor"
        >
          <Input placeholder="Vendor" className="w-full" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRulesOp}
          name="model"
          label="Model"
        >
          <Input placeholder="Model" className="w-full" />
        </Form.Item>
        <Form.Item rules={generalValidationRulesOp} name="cost" label="Cost">
          <InputNumber step={0.2} placeholder="Cost" className="w-full" />
        </Form.Item>

        <Form.Item
          rules={generalValidationRulesOp}
          name="purchaseDate"
          label="Purchase Date"
        >
          <DatePicker placeholder="Purchase Date" className="w-full" />
        </Form.Item>

        <Form.Item
          name="status"
          rules={generalValidationRules}
          initialValue={assetStatus}
        >
          <Select
            value={assetStatus}
            placeholder="Status"
            options={ASSET_STATUSES.map((item) => ({
              label: item,
              value: item,
            }))}
            onSelect={(val: TAssetStatus) => setAssetStatus(val)}
          />
        </Form.Item>
        {assetStatus === "assigned" && (
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

export default AddSingleAsset;
