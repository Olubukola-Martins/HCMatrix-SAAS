import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_ASSET_TYPES } from "../../hooks/asset-type/useGetAssetTypes";
import { TAssetType } from "../../types";
import { useUpdateAssetType } from "../../hooks/asset-type/useUpdateAssetType";
import { QUERY_KEY_FOR_ASSET_ANALYTICS } from "../../hooks/useGetAssetAnalytics";

interface IProps extends IModalProps {
  type?: Pick<TAssetType, "id" | "name">;
}

const EditAssetType: React.FC<IProps> = ({ open, handleClose, type }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      ...type,
    });
  }, [form, type]);
  const { mutate, isLoading } = useUpdateAssetType();

  const handleSubmit = (data: any) => {
    if (!type) return;
    mutate(
      {
        id: type.id,
        data: {
          name: data.name,
        },
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
            queryKey: [QUERY_KEY_FOR_ASSET_TYPES],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ASSET_ANALYTICS],
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
      title={"Edit Asset Type"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          rules={textInputValidationRules}
          name="name"
          label="Asset Name"
        >
          <Input placeholder="Asset Name" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};

export default EditAssetType;
