import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";

import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { IModalProps } from "types";
import {
  generalValidationRulesOp,
  textInputValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { FileUpload } from "components/FileUpload";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_SINGLE_ASSET } from "../hooks/useGetSingleAsset";
import { useUpdateAsset } from "../hooks/useUpdateAsset";
import { TAsset } from "../types";
import dayjs from "dayjs";
import { FormAssetTypeInput } from "./asset-type/FormAssetTypeInput";

interface IProps extends IModalProps {
  asset: TAsset;
}

const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg mb-4";

export const EditSingleAsset: React.FC<IProps> = ({
  handleClose,
  open,
  asset,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateAsset();

  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const imageUrl = useCurrentFileUploadUrl("imageUrl");

  useEffect(() => {
    form.setFieldsValue({
      name: asset.name,
      typeId: asset.typeId,
      description: asset.description,
      color: asset.color,
      cost: asset.cost,
      model: asset.model,
      brand: asset.brand,
      serialNumber: asset.serialNumber,
      uid: asset.uid,

      purchaseDate: asset.purchaseDate ? dayjs(asset.purchaseDate) : null,
      imageUrl: asset.imageUrl,
    });
  }, [form, asset]);

  const handleSubmit = (data: any) => {
    const existingDocs = asset.documentUrls ?? [];
    mutate(
      {
        body: {
          name: data.name,
          typeId: data.typeId,
          status: data?.status ?? asset?.status,
          description: data.description ?? undefined,
          color: data.color,
          cost: data.cost,
          model: data.model,
          brand: data.brand,
          serialNumber: data.serialNumber,
          uid: data.uid,
          purchaseDate: data.purchaseDate,
          imageUrl: imageUrl,
          documentUrls: !!documentUrl ? [...existingDocs, documentUrl] : [],
        },
        id: asset.id,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_ASSET],
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
      title={"Edit Asset"}
      style={{ top: 10 }}
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
          rules={textInputValidationRulesOp}
          name="description"
          label="Description"
        >
          <Input placeholder="Description" className="w-full" />
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
