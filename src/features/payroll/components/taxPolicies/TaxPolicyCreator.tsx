import { Form, Input, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";
import { TaxUIFormulaForm } from "./TaxUIFormulaForm";
import { TTaxCondition } from "features/payroll/utils/createTaxSalaryComponentFormula";
import { TTaxConfig } from "features/payroll/types/tax";

type TFormulaMode = "raw" | "ui";

const FORMULA_MODES: TFormulaMode[] = ["raw", "ui"];
export interface TTaxPolicyCreatorProps {
  dependencies?: string[];
}
export const TaxPolicyCreator: React.FC<
  TTaxPolicyCreatorProps & {
    formula: string;
    taxConfig?: TTaxConfig;

    setTaxConfig: React.Dispatch<React.SetStateAction<TTaxConfig | undefined>>;
    setFormula: React.Dispatch<React.SetStateAction<string>>;
    setComponentDescription: React.Dispatch<
      React.SetStateAction<string | undefined>
    >;
  }
> = ({
  dependencies = ["taxable_income", "gross_pay"],
  formula,
  setFormula,
  setComponentDescription,
  taxConfig,
  setTaxConfig,
}) => {
  const [mode, setMode] = useState<TFormulaMode>("ui");
  const taxableIncome = taxConfig?.taxableIncome;
  const handleFormula = (val: string) => {
    const regex = /taxable_income/g;
    let ans = val.replace(regex, `(${taxableIncome})`);
    setFormula(() => ans);
  };
  const handleComponentDescription = (val: string) => {
    setComponentDescription(() => val);
  };
  return (
    <div className="flex flex-col gap-4 mb-4">
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
          onChange={(e) =>
            setTaxConfig((prev) =>
              prev
                ? {
                    ...prev,
                    taxableIncome: e.target.value,
                  }
                : undefined
            )
          }
        />
      </div>
      {/* creator-forms */}
      <div className="">
        {mode === "ui" && (
          <TaxUIFormulaForm
            dependencies={dependencies}
            handleFormula={handleFormula}
            handleComponentDescription={handleComponentDescription}
            taxableIncome={taxableIncome}
            taxConditions={taxConfig?.conditions}
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
