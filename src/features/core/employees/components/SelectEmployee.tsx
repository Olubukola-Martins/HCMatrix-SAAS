import { Select, Spin } from "antd";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { TEmployee } from "../types";

export const SelectEmployee: React.FC<{
  handleSelect?: (val: number, employee?: TEmployee) => void;
  handleClear?: () => void;
  mode?: "multiple" | "tags";
  value?: number;
}> = ({
  handleSelect,

  mode,
  value,
  handleClear,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isSuccess } = useFetchEmployees({
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
    <Select
      value={value}
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
  );
};
