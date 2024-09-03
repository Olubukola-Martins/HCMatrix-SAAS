import { Select, Form, Spin } from "antd";
import { useDebounce } from "hooks/useDebounce";
import React, { useState } from "react";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";
import { useGetTimeOffPolicy } from "../hooks/useGetTimeOffPolicy";
import { ITimeOffPolicyRule } from "../types";

export const FormTimeOffPolicyInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string; multiple?: boolean };
  optional?: boolean;
  handleSelect?: (val: number, timeOff?: ITimeOffPolicyRule) => void;
  handleClear?: () => void;
}> = ({
  Form,
  showLabel = true,
  control,
  optional = false,
  handleSelect,
  handleClear,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching, isSuccess } = useGetTimeOffPolicy({
    search: debouncedSearchTerm,
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  const handleClearFunction = () => {
    setSearchTerm("");
    handleClear && handleClear();
  };

  return (
    <Form.Item
      name={control?.name ?? "policyId"}
      label={showLabel ? control?.label ?? "Time off policy" : null}
      rules={optional ? generalValidationRulesOp : generalValidationRules}
    >
      <Select
        mode={control?.multiple ? "multiple" : undefined}
        placeholder="Select timeoff policy"
        loading={isFetching}
        showSearch
        allowClear
        onClear={() => handleClearFunction()}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSelect={(val: number) => {
          const timeOff = data?.data.find((item) => item.id === val);
          handleSelect?.(val, timeOff);
        }}
      >
        {isSuccess ? (
          data?.data.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.title}
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
