import { Form, Input, InputNumber, Modal, Select, Tag } from "antd";
import { AppButton } from "components/button/AppButton";
import { MONTH_CHART_LABELS } from "constants/general";
import React, { useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

type IFormProps = {
  dependencies: string[];
  amountRestriction?: "negative" | "positive" | "neutral";
  handleSave: () => void;
  componentName?: string;

  monthsApplicable?: {
    mode: "multiple" | "single";
  };
};
type IProps = IFormProps & IModalProps;

type TCalculationMode = "formula" | "percentage of gross" | "fixed amount";

export const AddSalaryComponent: React.FC<IProps> = ({
  open,
  handleClose,
  dependencies,
  componentName,
}) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Add Allowance"}
      style={{ top: 20 }}
    >
      <AddSalaryComponentForm
        dependencies={dependencies}
        handleSave={() => {}}
        componentName={componentName}
      />
    </Modal>
  );
};

export const AddSalaryComponentForm: React.FC<IFormProps> = ({
  dependencies,
  amountRestriction = "neutral",
  monthsApplicable,
  componentName,
}) => {
  const [mode, setMode] = useState<TCalculationMode>("percentage of gross");
  const [form] = Form.useForm();
  //   TO DO write a function that makes use of amntRestrict to set max/min of inputNumber
  const handleSubmit = (vals: any) => {
    console.log(vals, "salary");
  };
  return (
    <Form
      layout="vertical"
      form={form}
      requiredMark={false}
      onFinish={handleSubmit}
    >
      {typeof componentName === "undefined" && (
        <Form.Item label="Name" rules={textInputValidationRules} name={`name`}>
          <Input placeholder="Salary Component Name" />
        </Form.Item>
      )}
      <Form.Item label="Select calculation mode">
        <Select
          className="capitalize"
          value={mode}
          onSelect={(val: TCalculationMode) => setMode(val)}
          options={["formula", "percentage of gross", "fixed amount"].map(
            (item) => ({
              label: <span className="capitalize">{item}</span>,
              value: item,
            })
          )}
        />
      </Form.Item>
      {mode === "percentage of gross" && (
        <Form.Item
          label="What percentage of gross pay?"
          rules={generalValidationRules}
          name="percentage"
        >
          <InputNumber
            min={0}
            placeholder="Percentage of Gross"
            className="w-full"
          />
        </Form.Item>
      )}
      {mode === "fixed amount" && (
        <Form.Item label="Amount" rules={generalValidationRules} name="amount">
          <InputNumber min={0} placeholder="Amount" className="w-full" />
        </Form.Item>
      )}

      {mode === "formula" && (
        <>
          {" "}
          <Form.Item label="Available Variables" name="formula">
            <div className="flex gap-2 flex-wrap">
              {dependencies.map((item, i) => (
                <Tag key={item} children={item} color="#01966b" />
              ))}
            </div>
          </Form.Item>
          <Form.Item label="Formula" rules={textInputValidationRules}>
            <Input.TextArea placeholder="Please make use of only variables" />
          </Form.Item>
        </>
      )}
      {monthsApplicable && (
        <Form.Item
          label={`What month${
            monthsApplicable.mode === "multiple" ? "s" : ""
          } is this component applicable to ?`}
          rules={generalValidationRules} //TO DO: write a custom validation rule for this
        >
          <Select
            options={MONTH_CHART_LABELS.map((item) => ({
              label: item,
              value: item,
            }))}
            mode={monthsApplicable.mode === "multiple" ? "tags" : undefined}
          />
        </Form.Item>
      )}
      <div className="flex justify-end">
        <AppButton label="Save" type="submit" />
      </div>
    </Form>
  );
};
