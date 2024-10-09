import { Select, Form } from "antd";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";
import { useFetchRoles } from "../hooks/useFetchRoles";

export const FormRoleInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string | (string | number)[] };
  optional?: boolean;
  disabled?: boolean;
  mode?: "multiple" | "tags";
}> = ({
  Form,
  showLabel = true,
  control,
  optional = false,
  disabled,
  mode,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching } = useFetchRoles({
    searchParams: {
      name: debouncedSearchTerm,
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      rules={optional ? generalValidationRulesOp : generalValidationRules}
      name={control?.name ?? "roleId"}
      label={showLabel ? (control?.label ?? "Role") : null}
    >
      <Select
        disabled={disabled}
        placeholder="Select role"
        loading={isFetching}
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        mode={mode}
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
