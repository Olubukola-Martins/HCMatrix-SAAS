import { Select, Form } from "antd";
import { useFetchCountries } from "hooks/useFetchCountries";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FormNationalityInput: React.FC<{
  onClear?: () => void;
  handleSelect?: (val: number) => void;
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control, handleSelect, onClear }) => {
  const { data: countries, isFetching } = useFetchCountries();

  const [search, setSearch] = useState<string>("");
  const options = countries
    ?.filter(
      (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    )
    .map((c) => ({ label: c.name, value: c.name }));
  return (
    <Form.Item
      name={control?.name ?? "nationality"}
      label={showLabel ? control?.label ?? "Nationality" : null}
      rules={generalValidationRules}
    >
      <Select
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        loading={isFetching}
        onSelect={handleSelect}
        showSearch
        allowClear
        onClear={() => {
          setSearch("");
          onClear?.();
        }}
        className="rounded border-slate-400"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        searchValue={search}
        onSearch={(val) => setSearch(val)}
        options={options}
      />
    </Form.Item>
  );
};
