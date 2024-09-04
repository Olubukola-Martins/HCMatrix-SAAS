import { Select, Form, Spin } from "antd";
import { useDebounce } from "hooks/useDebounce";
import React, { useState } from "react";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";
import { AllLoanRequestProps } from "../types/loan";
import { useGetAllLoans } from "../hooks/requests/useGetAllLoans";

export const FormEmployeeLoanInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string; multiple?: boolean };
  optional?: boolean;
  handleSelect?: (val: number, loanList?: AllLoanRequestProps) => void;
}> = ({ Form, showLabel = true, control, optional = false, handleSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching, isSuccess } = useGetAllLoans({
    props: {
      searchParams: {
        name: debouncedSearchTerm,
      },
      status: ["disbursed", "repayment-in-process"],
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "loanId"}
      label={showLabel ? control?.label ?? "Loan" : null}
      rules={optional ? generalValidationRulesOp : generalValidationRules}
    >
      <Select
        mode={control?.multiple ? "multiple" : undefined}
        placeholder="Select loan"
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
          const loan = data?.data.find((item) => item.id === val);
          handleSelect?.(val, loan);
        }}
      >
        {isSuccess ? (
          data?.data.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.id.toString().padStart(7, "0")}
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
