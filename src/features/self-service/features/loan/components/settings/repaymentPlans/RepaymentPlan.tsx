import { Switch, Form, InputNumber, Input } from "antd";
import React, { useState } from "react";
import { boxStyle, boxTitle } from "styles/reused";
import {
  numberInputValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import RepaymentPlanTable from "./RepaymentPlanTable";
import {
  QUERY_KEY_FOR_LOAN_PAYMENT_PLANS,
  useGetLoanPaymentPlans,
} from "../../../hooks/paymentPlan/useGetPaymentPlans";
import { useAddLoanPaymentPlan } from "../../../hooks/paymentPlan/useAddPaymentPlan";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { usePagination } from "hooks/usePagination";
import { LoadingOutlined } from "@ant-design/icons";

const RepaymentPlan = () => {
  const [paymentPlanSwitch, setPaymentPlanSwitch] = useState(false);
  const [form] = Form.useForm();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAddLoanPaymentPlan();

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
        duration: data.duration,
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

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LOAN_PAYMENT_PLANS],
            // exact: true,
          });
        },
      }
    );
  };

  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetLoanPaymentPlans({
    pagination,
  });

  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Set Payment Plan</h5>
        <Switch
          checked={paymentPlanSwitch}
          onChange={(value) => {
            setPaymentPlanSwitch(value);
          }}
        />
      </div>
      <p className="text-sm pt-2">
        Define different loan repayment plans and their corresponding durations
      </p>
      {paymentPlanSwitch && (
        <Form
          className="mt-4"
          form={form}
          onFinish={handleSubmit}
          layout="inline"
        >
          <Form.Item name="name" rules={textInputValidationRules}>
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="duration" rules={numberInputValidationRules}>
            <InputNumber
              className="w-full"
              placeholder="Enter the duration in months"
            />
          </Form.Item>
          <span
            onClick={() => form.submit()}
            className="text-sm cursor-pointer text-caramel font-medium text-right block pt-2 underline"
          >
            {!isLoading ? "+ Add" : <LoadingOutlined />}
          </span>

          <div className="mt-6 w-full">
            <RepaymentPlanTable
              pagination={pagination}
              onChange={onChange}
              data={data?.data}
              total={data?.total}
              loading={isFetching}
            />
          </div>
          <div className="flex items-center justify-between mt-6 mb-2">
            <button
              type="button"
              onClick={() => setPaymentPlanSwitch(false)}
              className="transparentButton"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default RepaymentPlan;
