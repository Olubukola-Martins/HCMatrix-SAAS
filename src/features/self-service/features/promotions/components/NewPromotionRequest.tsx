import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  dateHasToBeGreaterThanOrEqualToCurrentDayRule,
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_PROMOTION_REQUISITIONS } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions";
import { useCreatePromotionRequisition } from "../../requisitions/hooks/promotion/useCreatePromotionRequisition";
import { FormDesignationInput } from "features/core/designations/components/FormDesignationInput";
import { QUERY_KEY_FOR_PROMOTION_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions4AuthEmployee";
import { QUERY_KEY_FOR_APPROVAL_REQUESTS } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT } from "features/notifications/hooks/unRead/useGetUnReadNotificationCount";
import { QUERY_KEY_FOR_NOTIFICATIONS } from "features/notifications/hooks/useGetAlerts";

export const NewPromotionRequest: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreatePromotionRequisition();

  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const handleSubmit = (data: any) => {
    mutate(
      {
        date: data.date.toString(),
        preferredStartDate: data.preferredStartDate.toString(),
        proposedDesignationId: data.proposedDesignationId,
        justification: data.justification,
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
            queryKey: [QUERY_KEY_FOR_PROMOTION_REQUISITIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_PROMOTION_REQUISITIONS_FOR_AUTH_EMPLOYEE],
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
      title={"New Promotion Request"}
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
        <Form.Item
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRule]}
          name="preferredStartDate"
          label="Preferred Start Date"
        >
          <DatePicker placeholder="Preferred Start Date" className="w-full" />
        </Form.Item>

        <FormDesignationInput
          Form={Form}
          control={{
            name: "proposedDesignationId",
            label: "Proposed Designation",
          }}
        />
        <Form.Item
          rules={textInputValidationRules}
          name="justification"
          label="justification"
        >
          <Input.TextArea placeholder="justification" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
