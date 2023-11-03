import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useApproveOrRejectLeaveRelieverRequest } from "../../hooks/leaveRelieverApproval/useApproveOrRejectLeaveRelieverRequest";
import { QUERY_KEY_FOR_LEAVE_RELIEVER_APPROVALS } from "../../hooks/leaveRelieverApproval/useGetLeaveRelieverApprovals";

interface IProps extends IModalProps {
  approvalId: number;
  status: "approved" | "rejected";
}

export const ApproveLeaveRelieveRequest: React.FC<IProps> = ({
  open,
  handleClose,
  approvalId,
  status,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useApproveOrRejectLeaveRelieverRequest();

  const handleSubmit = (data: any) => {
    mutate(
      {
        approvalId,
        data: {
          status,
          comment: data.comment,
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
            queryKey: [QUERY_KEY_FOR_LEAVE_RELIEVER_APPROVALS],
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
      title={
        status === "approved"
          ? "Approve Leave Reliever Request"
          : "Reject Leave Reliever Request"
      }
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
          name="comment"
          label="Comment"
        >
          <Input.TextArea placeholder="Comment" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
