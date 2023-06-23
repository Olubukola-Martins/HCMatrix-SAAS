import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Select } from "antd";
import { generalValidationRules } from "utils/formHelpers/validation";
import { CURRENCY_OPTIONS } from "constants/currencies";
import { AppButton } from "components/button/AppButton";

export const ExchangeRateContainer = () => {
  // There should be view and edit state for conditional ui
  return (
    <div className="mt-4 bg-card py-6 px-6 flex justify-center gap-4">
      <div className="flex flex-col gap-4 w-3/4 items-stretch ">
        <p className="text-center">Base Currency - from company params (NGN)</p>
        <div className="w-full">
          <ExchangeRateForm />
        </div>
      </div>
    </div>
  );
};

const ExchangeRateForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: "100%" }}
      requiredMark={false}
    >
      <div className="flex justify-end border-b mb-2 pb-2">
        <AppButton label="Save" type="submit" />
      </div>
      <Form.List
        name="exchanges"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 1) {
                return Promise.reject(new Error("At least 1 exchange rate"));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map(({ name, ...field }, index) => (
              <div className="flex gap-4 items-center">
                <div className="">
                  <Form.Item
                    label={index === 0 ? "Currency" : ""}
                    {...field}
                    name={[name, "currency"]}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={generalValidationRules}
                  >
                    <Select
                      placeholder="Select Currency"
                      options={CURRENCY_OPTIONS}
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  label={index === 0 ? "Exchange Rate" : ""}
                  {...field}
                  name={[name, "rate"]}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={generalValidationRules}
                >
                  <InputNumber min={1} placeholder="Enter Rate" />
                </Form.Item>
                {fields.length > 1 ? (
                  <Form.Item className={index === 0 ? "mt-7" : ""}>
                    <Button
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                    />
                  </Form.Item>
                ) : null}
              </div>
            ))}
            <Form.Item>
              <AppButton
                variant="transparent"
                label="Add Exchange"
                handleClick={() => add()}
              />

              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};
