import { Select, Form } from "antd";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { TEmployee } from "../types";

export const FormEmployeeInput: React.FC<{
  handleSelect?: (val: number, employee?: TEmployee) => void;
  handleClear?: () => void;
  fieldKey?: number;
  Form: typeof Form;
  noStyle?: boolean;
  showLabel?: boolean;
  optional?: boolean;
  mode?: "multiple" | "tags";
  disabled?: boolean;
  control?: { label: string; name: string | (string | number)[] };
}> = ({
  Form,
  showLabel = true,
  control,
  handleSelect,
  fieldKey,
  optional = false,
  mode,
  noStyle,
  handleClear,
  disabled,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data } = useFetchEmployees({
    searchParams: {
      name: debouncedSearchTerm,
    },
    status: ["confirmed", "probation"],
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  const onClear = () => {
    setSearchTerm("");
    handleClear?.();
  };

  return (
    <Form.Item
      fieldKey={fieldKey}
      noStyle={noStyle}
      name={control?.name ?? "employeeId"}
      label={showLabel ? control?.label ?? "Employee" : null}
      rules={optional ? generalValidationRulesOp : generalValidationRules}
    >
      <Select
        disabled={disabled}
        mode={mode}
        onSelect={(val: number) => {
          const employee = data?.data.find((emp) => emp.id === val);
          handleSelect?.(val, employee);
        }}
        placeholder={`Select employee${!!mode ? "s" : ""}`}
        showSearch
        allowClear
        onClear={onClear}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
      >
        {data?.data.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            {item.firstName} {item.lastName}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
