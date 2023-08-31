import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import form from "antd/lib/form";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_APPROVAL_REQUESTS } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useUpdateApproval } from "features/core/workflows/hooks/useUpdateApproval";
import { data } from "features/payroll/components/WaterFallChart";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

interface IProps {
  handleSuccess?: () => void;
}

export const useApproveORReject = ({ handleSuccess }: IProps = {}) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useUpdateApproval();
  const handleApproveOrReject = ({
    approvalStageId,
    workflowType,
    data,
  }: {
    approvalStageId: number;
    workflowType: "basic" | "advanced";
    data: {
      status: "approved" | "rejected";
      otp?: string;
      comment?: string;
    };
  }) => {
    mutate(
      {
        approvalStageId,
        workflowType,
        data,
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
          handleSuccess?.();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_APPROVAL_REQUESTS],
            // exact: true,
          });
        },
      }
    );
  };
  const [open, setOpen] = useState(true);

  const confirmApprovalAction = ({
    approvalStageId,
    workflowType,
    status,
  }: {
    approvalStageId: number;
    workflowType: "basic" | "advanced";
    status: "approved" | "rejected";
  }) => {
    return (
      <ApprovalForm
        handleSubmit={{
          fn: ({ comment, otp }) =>
            handleApproveOrReject({
              approvalStageId,
              data: { status, comment, otp },
              workflowType,
            }),
          isLoading,
        }}
        open={true}
        handleClose={() => setOpen(false)}
      />
    );
  };

  return { confirmApprovalAction };
};

const ApprovalForm: React.FC<
  IModalProps & {
    handleSubmit: {
      fn: (props: { otp?: string; comment?: string }) => void;
      isLoading?: boolean;
    };
  }
> = ({ handleSubmit, open, handleClose }) => {
  const [form] = Form.useForm();

  return (
    <Modal open={open} onCancel={() => handleClose()}>
      <Form
        layout="vertical"
        form={form}
        onFinish={(data) =>
          handleSubmit.fn({ otp: data.otp, comment: data.comment })
        }
        requiredMark={false}
      >
        <Form.Item rules={textInputValidationRules} name="otp" label="OTP">
          <Input placeholder="OTP" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={handleSubmit.isLoading} />
        </div>
      </Form>
    </Modal>
  );
};
