import { Select, Form } from "antd";
import { useGetPayGradeCategories } from "features/payroll/hooks/payGrades/category/useGetPayGradeCategories";
import { TPayGradeCategory } from "features/payroll/types";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FormPayGradeCategoryInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  onSelect?: (val: number, option: TPayGradeCategory) => void;
  control?: { label: string; name: string | (string | number)[] };
}> = ({ Form, showLabel = true, control, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching } = useGetPayGradeCategories({
    searchParams: {
      name: debouncedSearchTerm,
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "payGradeCategoryId"}
      label={showLabel ? control?.label ?? "Pay Grade Category" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select Pay Grade Category"
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
          const category = data?.data.find((item) => item.id === val);
          category && onSelect?.(val, category);
        }}
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
