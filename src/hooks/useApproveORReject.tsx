import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { QUERY_KEY_FOR_APPROVAL_REQUESTS } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useUpdateApproval } from "features/core/workflows/hooks/useUpdateApproval";
import { useQueryClient } from "react-query";
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
    status,
  }: {
    approvalStageId: number;
    workflowType: "basic" | "advanced";
    status: "approved" | "rejected";
  }) => {
    mutate(
      {
        approvalStageId,
        workflowType,
        data: {
          status,
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
          handleSuccess?.();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_APPROVAL_REQUESTS],
            // exact: true,
          });
        },
      }
    );
  };
  const confirmApprovalAction = ({
    approvalStageId,
    workflowType,
    status,
  }: {
    approvalStageId: number;
    workflowType: "basic" | "advanced";
    status: "approved" | "rejected";
  }) => {
    Modal.confirm({
      title: `Do you want to ${
        status === "approved" ? "approve" : "reject"
      } this request?`,
      icon: <ExclamationCircleOutlined />,
      content: `This will ${
        status === "approved" ? "approve" : "reject"
      } this request!`,
      width: 600,
      okButtonProps: { loading: isLoading },
      onOk() {
        handleApproveOrReject({ approvalStageId, status, workflowType });
      },
    });
  };

  return { confirmApprovalAction, handleSuccess };
};
