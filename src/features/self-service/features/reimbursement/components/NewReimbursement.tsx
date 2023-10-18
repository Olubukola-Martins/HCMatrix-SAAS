import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { FileUpload } from "components/FileUpload";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { boxStyle } from "styles/reused";
import { IModalProps } from "types";
import {
  dateHasToBeGreaterThanOrEqualToCurrentDayRule,
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { useCreateReimbursementRequisition } from "../../requisitions/hooks/reimbursement/useCreateReimbursementRequisition";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_REIMBURSEMENT_REQUISITIONS } from "../../requisitions/hooks/reimbursement/useGetReimbursementRequisitions";
import { QUERY_KEY_FOR_REIMBURSEMENT_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/reimbursement/useGetReimburements4AuthEmployee";
import { QUERY_KEY_FOR_APPROVAL_REQUESTS } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT } from "features/notifications/hooks/unRead/useGetUnReadNotificationCount";
import { QUERY_KEY_FOR_NOTIFICATIONS } from "features/notifications/hooks/useGetAlerts";

export const NewReimbursement: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateReimbursementRequisition();

  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const handleSubmit = (data: any) => {
    mutate(
      {
        amount: data.amount,
        date: data.date.toString(),
        description: data.description,
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
            queryKey: [QUERY_KEY_FOR_REIMBURSEMENT_REQUISITIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [
              QUERY_KEY_FOR_REIMBURSEMENT_REQUISITIONS_FOR_AUTH_EMPLOYEE,
            ],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_APPROVAL_REQUESTS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_NOTIFICATIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT],
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
      title={"New Reimbursement"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRule]}
          name="date"
          label="Date"
        >
          <DatePicker placeholder="Date" className="w-full" />
        </Form.Item>

        <Form.Item rules={textInputValidationRules} name="title" label="Title">
          <Input placeholder="title" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="description"
          label="Description"
        >
          <Input.TextArea placeholder="description" />
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
