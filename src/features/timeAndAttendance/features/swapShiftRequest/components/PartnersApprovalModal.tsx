import { Form, Input, Modal } from "antd";
import { useContext } from "react";
import { useQueryClient } from "react-query";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { IModalProps } from "types";
import { generalValidationRulesOp } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useUpdateSwapPartnerRequest } from "../hooks/useUpdateSwapPartnerRequest";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_MY_SWAP_PARTNER_APPROVAL } from "../hooks/useGetSwapPartnerApprovals";

interface IProps extends IModalProps {
  id: number;
  status: string;
}

export const PartnersApprovalModal = ({
  handleClose,
  open,
  id,
  status,
}: IProps) => {
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const { isLoading, mutate } = useUpdateSwapPartnerRequest();
  const queryClient = useQueryClient();

  const handleFormSubmit = (val: any) => {
    mutate(
      {
        id,
        status,
        comment: val.comment,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 7.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          form.resetFields();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          form.resetFields();
          handleClose();
          queryClient.invalidateQueries([
            QUERY_KEY_FOR_MY_SWAP_PARTNER_APPROVAL,
          ]);
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"My Swap Partner Request"}
      style={{ top: 20 }}
    >
      <Form
        requiredMark="optional"
        layout="vertical"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          name="comment"
          label="Comment"
          rules={generalValidationRulesOp}
        >
          <Input.TextArea className="w-full" placeholder="Comment" />
        </Form.Item>

        <AppButton
          label={status === "approved" ? "Accept" : "Reject"}
          type="submit"
          isLoading={isLoading}
        />
      </Form>
    </Modal>
  );
};
