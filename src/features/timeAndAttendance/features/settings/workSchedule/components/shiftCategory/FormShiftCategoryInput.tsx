import { Select, Form } from "antd";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";
import { useGetWorkSheduleShiftCategories } from "../../hooks/shift/categories/useGetWorkSheduleShiftCategories";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const FormShiftCategoryInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string | (string | number)[] };
  optional?: boolean;
  mode?: "multiple" | "tags";
  noStyle?: boolean;
}> = ({ noStyle, Form, showLabel = true, control, optional = false, mode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching } = useGetWorkSheduleShiftCategories({
    props: {
      pagination: {
        limit: DEFAULT_PAGE_SIZE,
      },
      isEnabled: true,
      search: debouncedSearchTerm,
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      noStyle={noStyle}
      name={control?.name ?? "categoryId"}
      label={showLabel ? control?.label ?? "Shift Category" : null}
      rules={optional ? generalValidationRulesOp : generalValidationRules}
    >
      <Select
        mode={mode}
        placeholder="Select Shift Category"
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
