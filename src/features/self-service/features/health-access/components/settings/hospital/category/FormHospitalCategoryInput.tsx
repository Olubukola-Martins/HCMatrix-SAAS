import { Select, Form } from "antd";
import { useGetHospitalCategories } from "features/self-service/features/health-access/hooks/hospital/category/useGetHospitalCategories";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";

export const FormHospitalCategoryInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string | (string | number)[] };
  optional?: boolean;
  mode?: "multiple" | "tags";
}> = ({ Form, showLabel = true, control, optional = false, mode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching } = useGetHospitalCategories({
    searchParams: {
      name: debouncedSearchTerm,
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "categoryId"}
      label={showLabel ? control?.label ?? "Hospital Category" : null}
      rules={optional ? generalValidationRulesOp : generalValidationRules}
    >
      <Select
        mode={mode}
        placeholder="Select Hospital Category"
        loading={isFetching} //TO DO : this should be added to all custom Fetch Form Inputs
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
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
