import { Form, Switch } from "antd";
import React, { useState } from "react";
import { boxStyle, boxTitle, inputStyle } from "styles/reused";
import {
  numberInputValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

const CompanyBankDetails = () => {
  const [bankDSwitch, setBankDSwitch] = useState(false);
  const [form] = Form.useForm();
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Company's Bank Details</h5>
        <Switch
          checked={bankDSwitch}
          onChange={(value) => {
            setBankDSwitch(value);
          }}
        />
      </div>
      <p className="text-sm pt-2">
        This is the bank details that recieve payments from the application
      </p>

      {bankDSwitch && (
        <div>
          <Form className="flex flex-col gap-4 mt-5" form={form}>
            <Form.Item noStyle name="bankName" rules={textInputValidationRules}>
              <input
                type="text"
                placeholder="Bank Name"
                className={inputStyle}
              />
            </Form.Item>
            <Form.Item
              noStyle
              name="accountName"
              rules={textInputValidationRules}
            >
              <input
                type="text"
                placeholder="Account Name"
                className={inputStyle}
              />
            </Form.Item>
            <Form.Item
              noStyle
              name={"accounNumber"}
              rules={numberInputValidationRules}
            >
              <input
                type="text"
                placeholder="Account Number"
                className={inputStyle}
              />
            </Form.Item>
            <div className="flex items-center justify-between mt-6 mb-2">
              <button
                onClick={() => setBankDSwitch(false)}
                className="transparentButton"
                type="button"
              >
                Cancel
              </button>
              <button className="button" type="submit">
                Save
              </button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CompanyBankDetails;
