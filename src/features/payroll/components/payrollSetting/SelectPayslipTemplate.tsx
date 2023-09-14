import { Form, Switch } from "antd";
import React, { useState } from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { FormPayslipTemplateInput } from "../payslips/templates/FormPayslipTemplateInput";

const SelectPayslipTemplate = () => {
  const [bankDSwitch, setBankDSwitch] = useState(false);
  const [form] = Form.useForm();
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Select Payslip Template</h5>
        <Switch
          checked={bankDSwitch}
          onChange={(value) => {
            setBankDSwitch(value);
          }}
        />
      </div>
      <p className="text-sm pt-2">
        This is will be the payslip template that will be used to create
        payslips
      </p>

      {bankDSwitch && (
        <div>
          <Form
            className="flex flex-col gap-4 mt-5"
            form={form}
            requiredMark={false}
          >
            <FormPayslipTemplateInput
              Form={Form}
              control={{ name: "payslipTemplateId", label: "" }}
            />

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

export default SelectPayslipTemplate;
