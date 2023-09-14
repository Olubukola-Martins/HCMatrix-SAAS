import { Form, Switch } from "antd";
import { FormCostCentreInput } from "features/payroll/components/costCentres/FormCostCentreInput";
import React, { useState } from "react";
import { boxStyle, boxTitle } from "styles/reused";

const SelectLoanCostCentre = () => {
  const [bankDSwitch, setBankDSwitch] = useState(false);
  const [form] = Form.useForm();
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Select Cost Centre</h5>
        <Switch
          checked={bankDSwitch}
          onChange={(value) => {
            setBankDSwitch(value);
          }}
        />
      </div>
      <p className="text-sm pt-2">
        This is the cost centre that loans repayments will be paid into
      </p>

      {bankDSwitch && (
        <div>
          <Form
            className="flex flex-col gap-4 mt-5"
            form={form}
            requiredMark={false}
          >
            <FormCostCentreInput
              Form={Form}
              control={{ name: "costCentreId", label: "" }}
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

export default SelectLoanCostCentre;
