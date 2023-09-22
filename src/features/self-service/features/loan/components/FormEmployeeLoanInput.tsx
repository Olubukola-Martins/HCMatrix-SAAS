import { Select, Spin } from "antd";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useGetLoanRequests } from "../hooks/requests/useGetLoanRequests";
import { TLoanRequest } from "../types";

export const FormEmployeeLoanInput: React.FC<{
  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string | (string | number)[] };
  handleSelect?: (val: number, loan?: TLoanRequest) => void;
  handleClear?: () => void;
}> = ({ Form, showLabel = true, control, handleSelect, handleClear }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching, isSuccess } = useGetLoanRequests({
    type: "me",
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

  const onClear = () => {
    setSearchTerm("");
    handleClear?.();
  };

  return (
    <Form.Item
      name={control?.name ?? "loanId"}
      label={showLabel ? control?.label ?? "Loan" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select Loan"
        loading={isFetching}
        showSearch
        onSelect={(val: number) => {
          if (handleSelect) {
            const loan = data?.data.find((emp) => emp.id === val);
            handleSelect(val, loan);
          }
        }}
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
