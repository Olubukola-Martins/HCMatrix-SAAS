import { Checkbox, Form, Input, InputNumber, Modal, Select, Tag } from "antd";
import { AppButton } from "components/button/AppButton";
import { useUpdateAllowanceOrDeduction } from "features/payroll/hooks/scheme/allowanceAndDeductionHandlers/useUpdateAllowanceOrDeduction";
import { QUERY_KEY_FOR_PAYROLL_SCHEME_BY_TYPE_OR_ID } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";
import { TPayrollScheme } from "features/payroll/types/payrollSchemes";
import {
  TSalaryComponent,
  TSalaryComponentCalculationMode,
} from "features/payroll/types/salaryComponents";
import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";
import {
  generalValidationRules,
  jsVariableNameValidationRule,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

type IFormProps = {
  dependencies: string[];
  type?: "allowance" | "deduction";
  isDefault?: boolean;
  isActive?: boolean;
  handleSave?: (props: TSalaryComponent) => void;
  componentName?: string;
  salaryComponent: TSalaryComponent;
  handleClose?: () => void;
};

type ExtraProps = {
  title?: string;
};
type IProps = IFormProps & IModalProps & ExtraProps;

export const EditSalaryComponent: React.FC<IProps> = ({
  open,
  handleClose,
  dependencies,
  componentName,
  salaryComponent,
  type,
  handleSave,
  title,
}) => {
  const defaultTitle =
    type === "allowance" ? "Edit Allowance" : "Edit Deduction";

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={title ?? defaultTitle}
      style={{ top: 20 }}
    >
      <EditSalaryComponentForm
        salaryComponent={salaryComponent}
        dependencies={dependencies}
        handleSave={handleSave}
        componentName={componentName}
        type={type}
        handleClose={handleClose}
      />
    </Modal>
  );
};

export const EditSalaryComponentForm: React.FC<IFormProps> = ({
  dependencies,
  type = "allowance",
  handleSave,
  isDefault = false,
  isActive = true,
  salaryComponent,
  componentName,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [mode, setMode] =
    useState<TSalaryComponentCalculationMode>("percentage");
  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateAllowanceOrDeduction();
  useEffect(() => {
    form.setFieldsValue({
      name: salaryComponent.name,
      mode: salaryComponent.mode,

      amount: salaryComponent.amount,
    });
    setMode(salaryComponent.mode);
  }, [form, salaryComponent]);

  //   TO DO write a function that makes use of amntRestrict to set max/min of inputNumber
  const handleSubmit = (vals: any) => {
    if (handleSave) {
      handleSave({
        ...salaryComponent,
        name: (vals.name as string).toLocaleLowerCase(),

        mode: vals.mode,
        isDefault,
        isActive,
        amount: vals.amount,
        label: (vals.name as string).toLocaleLowerCase().split(" ").join("_"),
      });
      return;
    }

    mutate(
      {
        type,
        schemeId: salaryComponent.schemeId,
        allowanceOrDeductionId: salaryComponent.id,
        body: {
          name: (vals.name as string).toLocaleLowerCase(),
          mode: vals.mode,
          isDefault,
          isActive,
          amount: vals.amount,
          label: (vals.name as string).toLocaleLowerCase().split(" ").join("_"),
          shouldDisplayOnReviewTable: vals?.shouldDisplayOnReviewTable,
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
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
          const newComp: TSalaryComponent = res.data.data as TSalaryComponent;
          queryClient.setQueriesData(
            [QUERY_KEY_FOR_PAYROLL_SCHEME_BY_TYPE_OR_ID],
            (vals: unknown): TPayrollScheme => {
              const data = vals as TPayrollScheme;
              if (data && !Array.isArray(data)) {
                return {
                  ...data,
                  salaryComponents: data.salaryComponents.map((item) =>
                    item.id === newComp.id ? newComp : item
                  ),
                };
              }

              return data;
            }
          );
          form.resetFields();
          handleClose?.();
        },
      }
    );
  };
  useEffect(() => {
    form.setFieldsValue({
      name: componentName,
    });
  }, [form, componentName]);
  return (
    <Form
      layout="vertical"
      form={form}
      requiredMark={false}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Name"
        rules={[jsVariableNameValidationRule]}
        name={`name`}
      >
        {/* TODO: Add Validation against comp name begining in with number or a name that is not compatible with js */}
        <Input placeholder="Salary Component Name" disabled={!!componentName} />
      </Form.Item>

      <Form.Item name={`mode`} label="Select calculation mode">
        <Select
          className="capitalize"
          value={mode}
          onSelect={(val: TSalaryComponentCalculationMode) => setMode(val)}
          options={["formula", "percentage", "fixed"].map((item) => ({
            label: <span className="capitalize">{item}</span>,
            value: item,
          }))}
        />
      </Form.Item>
      {mode === "percentage" && (
        <Form.Item
          label="What percentage of gross pay?"
          rules={generalValidationRules}
          name="amount"
        >
          <InputNumber
            min={0}
            placeholder="Percentage of Gross"
            className="w-full"
          />
        </Form.Item>
      )}
      {mode === "fixed" && (
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
          <Form.Item
            label="Formula"
            name="amount"
            rules={textInputValidationRules}
          >
            <Input.TextArea placeholder="Please make use of only variables" />
          </Form.Item>
        </>
      )}
      <Form.Item name="shouldDisplayOnReviewTable" label="">
        <Checkbox>Should be displayed on review table</Checkbox>
      </Form.Item>

      <div className="flex justify-end">
        <AppButton label="Save" type="submit" isLoading={isLoading} />
      </div>
    </Form>
  );
};
