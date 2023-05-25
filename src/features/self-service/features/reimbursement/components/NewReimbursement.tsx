import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { FileUpload } from "components/FileUpload";
import { AppButton } from "components/button/AppButton";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import React from "react";
import { boxStyle } from "styles/reused";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { useCreateReimbursementRequisition } from "../../requisitions/hooks/reimbursement/useCreateReimbursementRequisition";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_REIMBURSEMENT_REQUISITIONS } from "../../requisitions/hooks/reimbursement/useGetReimbursementRequisitions";
import { useApiAuth } from "hooks/useApiAuth";

export const NewReimbursement: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();
  const { currentUserEmployeeId } = useApiAuth();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateReimbursementRequisition();

  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const handleSubmit = (data: any) => {
    mutate(
      {
        amount: data.amount,
        date: data.date.toString(),
        description: data.description,
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
            queryKey: [QUERY_KEY_FOR_REIMBURSEMENT_REQUISITIONS],
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
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item rules={generalValidationRules}>
          <DatePicker placeholder="Date" />
        </Form.Item>
        <FormEmployeeInput
          Form={Form}
          control={{ name: "employeeId", label: "" }}
        />
        <Form.Item rules={textInputValidationRules}>
          <Input placeholder="title" />
        </Form.Item>
        <Form.Item rules={textInputValidationRules}>
          <Input.TextArea placeholder="description" />
        </Form.Item>
        <Form.Item rules={generalValidationRules}>
          <InputNumber placeholder="amount" />
        </Form.Item>
        <div className={boxStyle}>
          <FileUpload
            allowedFileTypes={[
              "image/jpeg",
              "image/png",
              "image/jpg",
              "application/pdf",
            ]}
            fileKey="attachmentUrls"
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
