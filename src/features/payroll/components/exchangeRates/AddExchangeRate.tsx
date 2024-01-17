import { Form, InputNumber, Select } from "antd";

import React from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { AppButton } from "components/button/AppButton";
import { useCreateExchageRate } from "features/payroll/hooks/exhangeRates/useCreateExchangeRate";
import { QUERY_KEY_FOR_EXCHANGE_RATES } from "features/payroll/hooks/exhangeRates/useGetExchangeRates";

interface IProps {
  currencyOptions: { label: string; value: string }[];
  onCancel: () => void;
}

export const AddExchangeRate: React.FC<IProps> = ({
  currencyOptions,
  onCancel,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isLoading } = useCreateExchageRate();

  const handleSubmit = (data: any) => {
    mutate(
      {
        currency: data.currency,
        rate: data.rate,
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
            queryKey: [QUERY_KEY_FOR_EXCHANGE_RATES],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <div className="">
      <Form layout="horizontal" onFinish={handleSubmit}>
        <div className="flex gap-4 w-full">
          <Form.Item name="currency" label="Currency" className="flex-1">
            <Select
              className="capitalize"
              showSearch
              options={currencyOptions}
            />
          </Form.Item>
          <Form.Item name="rate" label="Rate">
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <AppButton
              type="submit"
              label="Save"
              isLoading={isLoading}
              variant="transparent"
            />
          </Form.Item>
          <Form.Item>
            <AppButton
              label="Cancel"
              handleClick={() => onCancel()}
              isLoading={isLoading}
              variant="style-with-class"
              additionalClassNames={["border-none"]}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
