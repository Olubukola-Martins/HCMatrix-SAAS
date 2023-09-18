import { Select, Spin } from "antd";
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
  Form: any;
  noStyle?: boolean;
  showLabel?: boolean;
  optional?: boolean;
  mode?: "multiple" | "tags";
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
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isSuccess } = useFetchEmployees({
    searchParams: {
      name: debouncedSearchTerm,
    },
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
        mode={mode}
        onSelect={(val: number) => {
          if (handleSelect) {
            const employee = data?.data.find((emp) => emp.id === val);
            handleSelect(val, employee);
          }
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
        {isSuccess ? (
          data.data.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.firstName} {item.lastName}
            </Select.Option>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <Spin size="small" />
          </div>
        )}
      </Select>
    </Form.Item>
  );
};
