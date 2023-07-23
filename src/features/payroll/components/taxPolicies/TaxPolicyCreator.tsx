import { Form, Input, Select, Tag } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";
import { TaxUIFormulaForm } from "./TaxUIFormulaForm";

type TFormulaMode = "raw" | "ui";

const FORMULA_MODES: TFormulaMode[] = ["raw", "ui"];
export interface TTaxPolicyCreatorProps {
  dependencies?: string[];
  taxableIncome?: string;
}
export const TaxPolicyCreator: React.FC<TTaxPolicyCreatorProps> = ({
  dependencies = ["taxable_income", "gross_pay"],
}) => {
  const [mode, setMode] = useState<TFormulaMode>("ui");
  const [formula, setFormula] = useState("");
  const [taxableIncome, setTaxableIncome] = useState("");
  const handleFormula = (val: string) => {
    console.log("rendering formula", val);
    setFormula(val);
  };
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
      <div className="mb-6 flex flex-col gap-2 rounded-md">
        <div className="mb-6 flex flex-col gap-4">
          <h4 className="">Variables accessible in this policy</h4>
          <div>
            {dependencies.map((item) => (
              <Tag key={item} children={item} color="#01966b" />
            ))}
          </div>
        </div>
        <h4 className="">Define Taxable Income</h4>
        <Input
          value={taxableIncome}
          onChange={(e) => setTaxableIncome(e.target.value)}
        />
      </div>
      {/* creator-forms */}
      <div>
        {mode === "ui" && (
          <TaxUIFormulaForm
            dependencies={dependencies}
            handleFormula={handleFormula}
            taxableIncome={taxableIncome}
          />
        )}
        {mode === "raw" && (
          <RawFormulaForm
            dependencies={dependencies}
            handleFormula={handleFormula}
            formula={formula}
          />
        )}
      </div>
    </div>
  );
};

const RawFormulaForm: React.FC<
  TTaxPolicyCreatorProps & {
    handleFormula: (val: string) => void;
    formula: string;
  }
> = ({ dependencies = [], formula, handleFormula }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      formula,
    });
  }, [form, formula]);
  return (
    <Form layout="vertical" requiredMark={false} form={form} disabled>
      <Form.Item
        name="formula"
        label={`Write down your formula to calculate tax incrementally using taxable income?`}
        rules={generalValidationRules}
      >
        <Input.TextArea
          onChange={(e) => handleFormula(e.target.value)}
          rows={12}
          placeholder="You can write the code used to calculate the formula here"
        />
      </Form.Item>
    </Form>
  );
};
