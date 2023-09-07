import { Form, Input, InputNumber, Modal, Select, Tag } from "antd";
import { AppButton } from "components/button/AppButton";
import { useAddAllowanceOrDeduction } from "features/payroll/hooks/scheme/allowanceAndDeductionHandlers/useAddAllowanceOrDeduction";
import { QUERY_KEY_FOR_PAYROLL_SCHEME_BY_TYPE_OR_ID } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";
import { TPayrollScheme } from "features/payroll/types/payrollSchemes";
import {
  TSalaryComponent,
  TSalaryComponentCalculationMode,
  TSalaryComponentInput,
} from "features/payroll/types/salaryComponents";
import React, { useState, useEffect, useCallback } from "react";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";
import {
  isFormulaValid,
  isValidEvalExpression,
  jsVariableNameValidationRule,
  numberInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { TaxPolicyCreator } from "../taxPolicies";
import { useUpdateAllowanceOrDeduction } from "features/payroll/hooks/scheme/allowanceAndDeductionHandlers/useUpdateAllowanceOrDeduction";

const defaultCalculationModes: (TSalaryComponentCalculationMode | "table")[] = [
  "formula",
  "percentage",
  "fixed",
];
type IFormProps = {
  formMode?: "add" | "edit";
  dependencies?: string[];
  type?: "allowance" | "deduction";
  isDefault?: boolean;
  isActive?: boolean;
  handleSave?: (props: TSalaryComponentInput) => void;
  componentName?: string;
  schemeId?: number;
  handleClose?: () => void;
  isTax?: boolean;
  salaryComponent?: TSalaryComponent;
  loading?: boolean;
  defaultCalculationMode?: TSalaryComponentCalculationMode | "table";
};

type ExtraProps = {
  title?: string;
};
type IProps = IFormProps & IModalProps & ExtraProps;

export const AddSalaryComponent: React.FC<IProps> = ({
  open,
  handleClose,
  dependencies = [],
  componentName,
  schemeId,
  handleSave,
  isTax,
  type,
  title,
  salaryComponent,
  formMode = "add",
  loading,
  defaultCalculationMode,
}) => {
  const defaultTitle =
    type === "allowance" ? `${formMode} allowance` : `${formMode} deduction`;

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={<span className="capitalize">{title ?? defaultTitle}</span>}
      style={{ top: 20 }}
    >
      <AddSalaryComponentForm
        dependencies={dependencies}
        handleSave={handleSave}
        componentName={componentName}
        schemeId={schemeId}
        handleClose={handleClose}
        type={type}
        isTax={isTax}
        salaryComponent={salaryComponent}
        formMode={formMode}
        loading={loading}
        defaultCalculationMode={defaultCalculationMode}
      />
    </Modal>
  );
};

const DEFAULT_DEPENDENCIES_FROM_API = ["gross_pay"];
export const AddSalaryComponentForm: React.FC<IFormProps> = ({
  dependencies = [],
  formMode = "add",
  type = "allowance",
  handleSave,
  isDefault = false,
  isActive = true,
  schemeId,
  handleClose,
  componentName,
  salaryComponent,
  isTax,
  loading,
  defaultCalculationMode = "percentage",
}) => {
  const [form] = Form.useForm();

  dependencies = [...DEFAULT_DEPENDENCIES_FROM_API, ...dependencies];
  const queryClient = useQueryClient();

  const [mode, setMode] = useState<TSalaryComponentCalculationMode | "table">(
    "percentage"
  );
  useEffect(() => {
    setMode(defaultCalculationMode);
  }, [defaultCalculationMode]);
  const { mutate: createMutate, isLoading: isCreateLoading } =
    useAddAllowanceOrDeduction();
  const { mutate: updateMutate, isLoading: isUpdateLoading } =
    useUpdateAllowanceOrDeduction();

  //TODO: write a function that makes use of amntRestrict to set max/min of inputNumber
  const handleUpdate = useCallback(
    (vals: any) => {
      salaryComponent &&
        updateMutate(
          {
            schemeId: salaryComponent.schemeId,
            allowanceOrDeductionId: salaryComponent.id,

            type,
            body: {
              name: (vals.name as string).toLocaleLowerCase(),
              mode: mode === "table" ? "formula" : mode,
              amount: mode === "table" ? taxFormula : vals.amount,
              isDefault,
              isActive,
              label: (vals.name as string)
                .toLocaleLowerCase()
                .split(" ")
                .join("_"),
            },
          },
          {
            onError: (err: any) => {
              openNotification({
                state: "error",
                title: "Error Occurred",
                duration: 2,
                description:
                  err?.response.data.message ??
                  err?.response.data.error.message,
              });
            },
            onSuccess: (res: any) => {
              openNotification({
                state: "success",

                title: "Success",
                description: res.data.message,
                // duration: 0.4,
              });
              const newComp: TSalaryComponent = res.data
                .data as TSalaryComponent;
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
              handleClose?.();
            },
          }
        );
    },
    [
      handleClose,
      isActive,
      isDefault,
      queryClient,
      salaryComponent,
      type,
      updateMutate,
    ]
  );
  const handleCreate = (vals: any) => {
    if (handleSave) {
      handleSave({
        name: (vals.name as string).toLocaleLowerCase(),
        type,
        mode: mode === "table" ? "formula" : mode,
        amount: mode === "table" ? taxFormula : vals.amount,
        isDefault,
        isActive,
        label: (vals.name as string).toLocaleLowerCase().split(" ").join("_"),
      });

      return;
    }
    schemeId &&
      createMutate(
        {
          schemeId,
          type,
          body: {
            name: (vals.name as string).toLocaleLowerCase(),
            mode: mode === "table" ? "formula" : mode,
            amount: mode === "table" ? taxFormula : vals.amount,
            isDefault,
            isActive,
            label: (vals.name as string)
              .toLocaleLowerCase()
              .split(" ")
              .join("_"),
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
                    salaryComponents: [
                      ...data.salaryComponents,
                      { ...newComp },
                    ],
                  };
                }

                return data;
              }
            );
            handleClose?.();
            form.resetFields();
          },
        }
      );
  };

  const handleSubmit = (data: any): void => {
    if (salaryComponent) {
      handleUpdate(data);
      return;
    }
    handleCreate(data);
  };
  useEffect(() => {
    // This is done so that when the switch is toggled off it updates the default salary component appropriately
    if (
      isDefault &&
      salaryComponent?.isActive === !isActive &&
      isActive === false
    ) {
      handleUpdate({ ...salaryComponent, isActive: false });
    }
  }, [isDefault, isActive, salaryComponent, handleUpdate]);
  useEffect(() => {
    if (salaryComponent) {
      form.setFieldsValue({
        name: salaryComponent.name?.split("_").join(" "),
        amount: salaryComponent.amount,
        mode: salaryComponent.mode,
      });

      setMode(salaryComponent.mode); //TODO: Account for the tabular mode

      return;
    }
    form.setFieldsValue({
      name: componentName?.split("_").join(" "),
    });
  }, [form, componentName, salaryComponent]);
  // useEffect(() => {
  //   form.setFieldValue("amount", undefined);
  // }, [form, mode]);
  const calculationModes = isTax
    ? [...defaultCalculationModes, "table"]
    : defaultCalculationModes;

  const [taxFormula, setTaxFormula] = useState("");

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

      <Form.Item label="Select calculation mode">
        <Select
          className="capitalize"
          value={mode}
          onSelect={(val: TSalaryComponentCalculationMode | "table") =>
            setMode(val)
          }
          options={calculationModes.map((item) => ({
            label: <span className="capitalize">{item}</span>,
            value: item,
          }))}
        />
      </Form.Item>
      {mode === "percentage" && (
        <Form.Item
          label="What percentage of gross pay?"
          name="amount"
          rules={numberInputValidationRules}
        >
          <InputNumber
            min={0}
            placeholder="Percentage of Gross"
            className="w-full"
          />
        </Form.Item>
      )}
      {mode === "fixed" && (
        <Form.Item
          label="Amount"
          rules={numberInputValidationRules}
          name="amount"
        >
          <InputNumber min={0} placeholder="Amount" className="w-full" />
        </Form.Item>
      )}

      {mode === "formula" && (
        <>
          {" "}
          <Form.Item label="Available Variables">
            <div className="flex gap-2 flex-wrap">
              {dependencies.map((item, i) => (
                <Tag
                  key={item}
                  children={item}
                  color="#01966b"
                  className="cursor-pointer"
                  onClick={() =>
                    form.setFieldValue(
                      "amount",
                      (form.getFieldValue("amount") ?? "") + `${item}`
                    )
                  }
                />
              ))}
            </div>
          </Form.Item>
          <Form.Item
            label="Formula"
            name="amount"
            rules={[
              {
                required: true,
                whitespace: true,
                validator: async (rule, value = "") => {
                  // Convert the value to its label equivalent
                  const parsedValue = value as string;
                  if (!isFormulaValid(parsedValue, dependencies))
                    throw new Error("Please enter a valid formula");
                  if (!isValidEvalExpression(parsedValue, dependencies))
                    throw new Error("Please enter a valid formula");
                  return true;
                },
              },
            ]}
          >
            <Input.TextArea
              placeholder="Please make use of only variables"
              allowClear
            />
          </Form.Item>
        </>
      )}
      {mode === "table" && (
        <>
          <TaxPolicyCreator
            dependencies={dependencies}
            formula={taxFormula}
            setFormula={setTaxFormula}
          />
        </>
      )}

      <div className="flex justify-end">
        <AppButton
          label="Save"
          type="submit"
          isLoading={loading || isCreateLoading || isUpdateLoading}
        />
      </div>
    </Form>
  );
};
