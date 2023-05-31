import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { FileUpload } from "components/FileUpload";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { boxStyle } from "styles/reused";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useApiAuth } from "hooks/useApiAuth";
import { useCreateMoneyRequisition } from "../../requisitions/hooks/money/useCreateMoneyRequisition";
import { QUERY_KEY_FOR_MONEY_REQUISITIONS } from "../../requisitions/hooks/money/useGetMoneyRequisitions";

export const NewMonetaryRequest: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();
  const { currentUserEmployeeId } = useApiAuth();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateMoneyRequisition();

  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const handleSubmit = (data: any) => {
    mutate(
      {
        amount: data.amount,
        date: data.date.toString(),
        purpose: data.purpose,
        employeeId: currentUserEmployeeId,
        title: data.title,
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
            queryKey: [QUERY_KEY_FOR_MONEY_REQUISITIONS],
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
      title={"New Monetary Request"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item rules={generalValidationRules} name="date" label="Date">
          <DatePicker placeholder="Date" className="w-full" />
        </Form.Item>

        <Form.Item rules={textInputValidationRules} name="title" label="Title">
          <Input placeholder="title" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="purpose"
          label="purpose"
        >
          <Input.TextArea placeholder="purpose" />
        </Form.Item>
        <Form.Item rules={generalValidationRules} name="amount" label="Amount">
          <InputNumber placeholder="amount" className="w-full" />
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
            textToDisplay="Upload Attachments"
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
