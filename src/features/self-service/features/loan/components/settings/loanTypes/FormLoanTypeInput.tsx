import { Select, Form, Spin } from "antd";
import { useDebounce } from "hooks/useDebounce";
import React, { useState } from "react";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";
import { useGetLoanTypes } from "../../../hooks/type/useGetLoanTypes";
import { TLoanType } from "../../../types";

export const FormLoanTypeInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string; multiple?: boolean };
  optional?: boolean;
  handleSelect?: (val: number, loanType?: TLoanType) => void;
}> = ({ Form, showLabel = true, control, optional = false, handleSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching, isSuccess } = useGetLoanTypes({
    searchParams: { name: debouncedSearchTerm },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "typeId"}
      label={showLabel ? control?.label ?? "Loan Type" : null}
      rules={optional ? generalValidationRulesOp : generalValidationRules}
    >
      <Select
        mode={control?.multiple ? "multiple" : undefined}
        placeholder="Select loan type"
        loading={isFetching} //TO DO : this should be added to all custom Fetch Form Inputs
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSelect={(val: number) => {
          const loanType = data?.data.find((item) => item.id === val);
          handleSelect?.(val, loanType);
        }}
      >
        {isSuccess ? (
          data?.data.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
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
