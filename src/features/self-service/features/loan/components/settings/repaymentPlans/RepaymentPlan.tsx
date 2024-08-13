import { Form, Input, InputNumber, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { useAddLoanPaymentPlan } from "../../../hooks/paymentPlan/useAddPaymentPlan";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_LOAN_PAYMENT_PLANS } from "../../../hooks/paymentPlan/useGetPaymentPlans";
import { useGetSingleLoanPaymentPlan } from "../../../hooks/paymentPlan/useGetSinglePaymentPlan";

export const RepaymentPlan = ({ handleClose, open, id }: IModalProps) => {
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate, isLoading: isLoadingCreate } = useAddLoanPaymentPlan();

  const { data, isSuccess, isLoading } = useGetSingleLoanPaymentPlan({
    id: id as unknown as number,
  });
  useEffect(() => {
    if (isSuccess && id) {
      form.setFieldsValue({
        ...data,
      });
    } else {
      form.resetFields();
    }
  }, [form, id, data, isSuccess]);

  const onSubmit = (values: any) => {
    mutate(
      {
        ...values,
        id,
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_LOAN_PAYMENT_PLANS]);
          handleClose();
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => handleClose()}
      title={`${id ? "Edit" : "Add"} Payment Plan`}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        onFinish={onSubmit}
        form={form}
        disabled={isLoading}
      >
        <Form.Item
          name="name"
          label="Plan Name"
          rules={textInputValidationRules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="duration"
          label="How many months"
          rules={generalValidationRules}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <AppButton type="submit" label="Add" isLoading={isLoadingCreate} />
      </Form>
    </Modal>
  );
};
