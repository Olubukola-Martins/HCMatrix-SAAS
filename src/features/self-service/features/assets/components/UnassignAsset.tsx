import { Form, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_SINGLE_ASSET } from "../hooks/useGetSingleAsset";
import { TAsset } from "../types";
import { useUpdateAsset } from "../hooks/useUpdateAsset";

interface IProps extends IModalProps {
  asset: TAsset;
}
export const UnassignAsset: React.FC<IProps> = ({
  open,
  handleClose,
  asset,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  const { mutate, isLoading } = useUpdateAsset();

  const handleSubmit = (values: any) => {
    const data = asset;
    mutate(
      {
        body: {
          name: data.name,
          typeId: data.typeId,
          dateAssigned: null,
          assigneeId: null,
          description: data.description ?? undefined,
          color: data.color,
          cost: +data.cost,
          model: data.model,
          brand: data.brand,
          serialNumber: data.serialNumber,
          uid: data.uid,
          status: "unassigned",
          purchaseDate: data.purchaseDate,
          imageUrl: data?.imageUrl ?? undefined,
          documentUrls: data.documentUrls,
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
      title={"Unassign User"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <div className="flex flex-col gap-3">
          <div>
            <span className="text-center text-base">
              Are you sure you want to unassign this asset?
            </span>
          </div>

          <div className="flex justify-end">
            <AppButton type="submit" isLoading={isLoading} />
          </div>
        </div>
      </Form>
    </Modal>
  );
};
