import { Select } from "antd";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useGetLoanPaymentPlans } from "../../../hooks/paymentPlan/useGetPaymentPlans";
import { TPaymentPlan } from "../../../types";
import { Form } from "antd";

export const FormLoanRepaymentPlanInput: React.FC<{
  handleSelect?: (val: number, plan?: TPaymentPlan) => void;
  handleClear?: () => void;
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string | (string | number)[] };
}> = ({ Form, showLabel = true, control, handleClear, handleSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching } = useGetLoanPaymentPlans({
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
      name={control?.name ?? "paymentPlanId"}
      label={showLabel ? control?.label ?? "Payment Plan" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select Payment Plan"
        loading={isFetching} //TO DO : this should be added to all custom Fetch Form Inputs
        showSearch
        allowClear
        onClear={onClear}
        onSelect={(val: number) => {
          if (handleSelect) {
            const plan = data?.data.find((item) => item.id === val);
            handleSelect(val, plan);
          }
        }}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
      >
        {data?.data.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
