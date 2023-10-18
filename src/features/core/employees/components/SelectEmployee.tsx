import { Select, Spin } from "antd";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { TEmployee } from "../types";
import { getEmployeeFullName } from "../utils/getEmployeeFullName";

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

  const { data, isLoading } = useFetchEmployees({
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
      loading={isLoading}
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
      options={data?.data.map((item) => ({
        label: <span className="capitalize">{getEmployeeFullName(item)} </span>,
        value: item.id,
      }))}
    ></Select>
  );
};
