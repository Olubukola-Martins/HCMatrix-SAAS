import { Form, Input, Select, Tag } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";
import { TaxUIFormulaForm } from "./TaxUIFormulaForm";

type TFormulaMode = "raw" | "ui";

const FORMULA_MODES: TFormulaMode[] = ["raw", "ui"];
export interface TTaxPolicyCreatorProps {
  dependencies?: string[];
}
export const TaxPolicyCreator: React.FC<TTaxPolicyCreatorProps> = ({
  dependencies = ["taxable_income", "gross_pay"],
}) => {
  const [mode, setMode] = useState<TFormulaMode>("ui");
  return (
    <div className="flex flex-col gap-4">
      {/* mode */}
      <div className="flex justify-end">
        <div className="flex flex-col gap-2">
          <span className="text-sm">Select a Mode</span>
          <div>
            <Select
              value={mode}
              onSelect={(val: TFormulaMode) => setMode(val)}
              size="small"
              className="capitalize w-20"
              options={FORMULA_MODES.map((item) => ({
                label: <span className="capitalize">{item}</span>,
                value: item,
              }))}
            />
          </div>
        </div>
      </div>
      {/* creator-forms */}
      <div>
        {mode === "ui" && <TaxUIFormulaForm dependencies={dependencies} />}
        {mode === "raw" && <RawFormulaForm dependencies={dependencies} />}
      </div>
    </div>
  );
};

const RawFormulaForm: React.FC<TTaxPolicyCreatorProps> = ({
  dependencies = [],
}) => {
  return (
    <Form layout="vertical" requiredMark={false}>
      <div className="mb-6 flex flex-col gap-4">
        <h4 className="">Variables accessible in this policy</h4>
        <div>
          {dependencies.map((item) => (
            <Tag key={item} children={item} color="#01966b" />
          ))}
        </div>
      </div>
      <Form.Item
        name="formula"
        label={`Write down your formula to calculate tax incrementally using taxable income?`}
        rules={generalValidationRules}
      >
        <Input.TextArea
          rows={12}
          placeholder="You can write the code used to calculate the formula here"
        />
      </Form.Item>
      <Form.Item>
        <div className="flex justify-end">
          <AppButton label="Save" />
        </div>
      </Form.Item>
    </Form>
  );
};
