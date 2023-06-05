import { DatePicker, Form, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_SINGLE_ASSET } from "../hooks/useGetSingleAsset";
import { useUpdateAsset } from "../hooks/useUpdateAsset";
import { TAsset } from "../types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";

interface IProps extends IModalProps {
  asset: TAsset;
}

export const AssignAsset: React.FC<IProps> = ({ open, handleClose, asset }) => {
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
          dateAssigned: values.dateAssigned,
          assigneeId: values.assigneeId,
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
      title={"Assign User"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <FormEmployeeInput
          Form={Form}
          control={{ label: "Assignee", name: "assigneeId" }}
        />
        <Form.Item
          rules={generalValidationRules}
          name="dateAssigned"
          label="Date assigned"
        >
          <DatePicker placeholder="Date assigned" className="w-full" />
        </Form.Item>
        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
