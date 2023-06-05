import { Form, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

import { boxStyle } from "styles/reused";
import { FileUpload } from "components/FileUpload";
import { QUERY_KEY_FOR_SINGLE_ASSET } from "../hooks/useGetSingleAsset";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { useUpdateAsset } from "../hooks/useUpdateAsset";
import { TAsset } from "../types";

interface IProps extends IModalProps {
  asset: TAsset;
}

export const AddAssetDocument: React.FC<IProps> = ({
  open,
  handleClose,
  asset,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateAsset();

  const documentUrl = useCurrentFileUploadUrl("documentUrl");

  const handleSubmit = () => {
    const existingDocs = asset.documentUrls ?? [];
    const data = asset;
    mutate(
      {
        body: {
          name: data.name,
          typeId: data.typeId,

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
      title={"Add Asset Document"}
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
            allowedFileTypes={[
              "image/jpeg",
              "image/png",
              "image/jpg",
              "application/pdf",
            ]}
            fileKey="documentUrl"
            textToDisplay="Add Documents"
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
