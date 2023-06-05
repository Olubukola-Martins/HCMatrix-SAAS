import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_SINGLE_ASSET } from "../hooks/useGetSingleAsset";
import { useUpdateDateReturnedForAssetAssignee } from "../hooks/useUpdateDateReturnedForAssetAssignee";
import { TAsset } from "../types";

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

  const { mutate, isLoading } = useUpdateDateReturnedForAssetAssignee();

  const handleSubmit = (values: any) => {
    if (asset.assigneeId) {
      const currentAssigneeHistoryId =
        asset.assigneeHistory[asset.assigneeHistory.length - 1].id;
      mutate(
        {
          assigneeHistoryId: currentAssigneeHistoryId,
          assetId: asset.id,
          body: {
            dateReturned: values.dateReturned.toString(),
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

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_ASSET],
              // exact: true,
            });
          },
        }
      );
    }
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
        <Form.Item
          rules={generalValidationRules}
          name="dateReturned"
          label="End Date"
        >
          <DatePicker placeholder="End Date" className="w-full" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
