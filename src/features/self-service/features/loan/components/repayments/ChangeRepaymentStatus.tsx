import { DatePicker, Form, Modal } from "antd";
import { IModalProps } from "types";
import { dateHasToBeLesserThanOrEqualToCurrentDayRule } from "utils/formHelpers/validation";
import { useChangeRepaymentPlanStatus } from "../../hooks/repayment/useChangeRepaymentPlanStatus";
import { AppButton } from "components/button/AppButton";
import { openNotification } from "utils/notifications";
import { useContext } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_GET_REPAYMENT_PLAN_DETAILS } from "../../hooks/repayment/useGetRepaymentPlanDetails";

interface IProps extends IModalProps {
  scheduleId: number;
  loanId: number;
}

export const ChangeRepaymentStatus = ({
  handleClose,
  open,
  loanId,
  scheduleId,
}: IProps) => {
const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const {mutate, isLoading} = useChangeRepaymentPlanStatus()
  const onSubmit = (val: any) => {
    mutate(
        {
            paidAt: val.paidAt,
            scheduleId,
            loanId
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
              duration: 4,
            });
            dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
            queryClient.invalidateQueries([QUERY_KEY_FOR_GET_REPAYMENT_PLAN_DETAILS]);
            handleClose()
          },
        }
      );
  };
  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => handleClose()}
      title={`Change Status`}
    >
      <Form
        requiredMark={false}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item
          rules={[dateHasToBeLesserThanOrEqualToCurrentDayRule]}
          name="paidAt"
          label="Date of Payment"
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <AppButton type="submit" isLoading={isLoading}/>
      </Form>
    </Modal>
  );
};
