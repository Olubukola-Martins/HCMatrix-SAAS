import { Form, Input, Modal } from "antd";
import React, { useContext } from "react";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import Themes from "./Themes";
import {
  textInputValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { AppButton } from "./button/AppButton";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_APPROVAL_REQUESTS } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useUpdateApproval } from "features/core/workflows/hooks/useUpdateApproval";
import { useQueryClient } from "react-query";

const ApprovalContainer = () => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch: globalDispatch } = globalCtx;
  const approval = globalState.currentApproval;
  const showModal = approval !== undefined;
  const [form] = Form.useForm();

  const handleClose = () => {
    globalDispatch({ type: EGlobalOps.setCurrentApproval, payload: undefined });
    form.resetFields();
  };
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
          handleClose();
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_APPROVAL_REQUESTS],
            // exact: true,
          });
          approval?.handleSuccess?.();
        },
      }
    );
  };

  return (
    <>
      {showModal ? (
        <Modal
          open={showModal}
          footer={null}
          onCancel={handleClose}
          title={`${
            approval.status === "approved" ? "Approve" : "Reject"
          } Request`}
        >
          <Themes>
            <Form
              layout="vertical"
              form={form}
              onFinish={(data) =>
                handleApproveOrReject({
                  approvalStageId: approval.approvalStageId,
                  data: {
                    status: approval.status,
                    comment: data?.comment,
                    otp: data?.otp,
                  },
                  workflowType: approval.workflowType,
                })
              }
              requiredMark={false}
            >
              {approval.requires2FA && (
                <Form.Item
                  rules={textInputValidationRules}
                  name="otp"
                  label="Enter OTP"
                >
                  <Input placeholder="OTP" />
                </Form.Item>
              )}
              <Form.Item
                rules={textInputValidationRulesOp}
                name="comment"
                label="Add Comment"
              >
                <Input.TextArea placeholder="Comment" />
              </Form.Item>

              <div className="flex justify-end">
                <AppButton type="submit" isLoading={isLoading} />
              </div>
            </Form>
          </Themes>
        </Modal>
      ) : null}
    </>
  );
};

export default ApprovalContainer;
