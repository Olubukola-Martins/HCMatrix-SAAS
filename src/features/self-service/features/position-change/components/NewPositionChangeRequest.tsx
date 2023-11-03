import { DatePicker, Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import {
  dateHasToBeGreaterThanOrEqualToCurrentDayRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useCreatePositionChangeRequisition } from "../../requisitions/hooks/position-change/useCreatePositionChangeRequisition";
import { FormDesignationInput } from "features/core/designations/components/FormDesignationInput";
import { QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS } from "../../requisitions/hooks/position-change/useGetPositionChangeRequisitions";
import { QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/position-change/useGetPositionChangeRequisitions4AuthEmployee";
import { QUERY_KEY_FOR_APPROVAL_REQUESTS } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT } from "features/notifications/hooks/unRead/useGetUnReadNotificationCount";
import { QUERY_KEY_FOR_NOTIFICATIONS } from "features/notifications/hooks/useGetAlerts";

export const NewPositionChangeRequest: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreatePositionChangeRequisition();

  const handleSubmit = (data: any) => {
    mutate(
      {
        date: data.date.toString(),
        proposedDesignationId: data.proposedDesignationId,
        skillsAndQualifications: data.skillsAndQualifications,
        reason: data.reason,
        justification: data.justification,
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
            queryKey: [QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [
              QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS_FOR_AUTH_EMPLOYEE,
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
      title={"New Position Change Request"}
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
        <FormDesignationInput
          Form={Form}
          control={{
            name: "proposedDesignationId",
            label: "Proposed Designation",
          }}
        />
        <Form.Item
          rules={textInputValidationRules}
          name="skillsAndQualifications"
          label="Skills And Qualifications"
        >
          <Input placeholder="Skills And Qualifications" />
        </Form.Item>
        <Form.Item
          rules={textInputValidationRules}
          name="reason"
          label="reason"
        >
          <Input.TextArea placeholder="reason" />
        </Form.Item>
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
