import { Form, Select } from "antd";
import { useGetUnlicensedEmployeeAddOn } from "features/billing/hooks/addOns/unlicensedEmployee/useGetUnlicensedEmployeeAddOn";
import { useState } from "react";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";

export const FormUnlicensedEmployeeAdonInput: React.FC<{
  onClear?: () => void;
  handleSelect?: (val: number) => void;
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string | string[] };
  optional?: boolean;
}> = ({
  Form,
  showLabel = true,
  control,
  handleSelect,
  onClear,
  optional = false,
}) => {
  const { data, isFetching } = useGetUnlicensedEmployeeAddOn();
  const result = data?.data;

  const [search, setSearch] = useState<string>("");
  const options = result
    ?.filter(
      (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    )
    .map((c) => ({ label: c.name, value: c.id }));

  return (
    <Form.Item
      name={control?.name ?? "addOnId"}
      label={showLabel ? control?.label ?? "Unlicensed Employee" : null}
      rules={optional ? generalValidationRulesOp : generalValidationRules}
    >
      <Select
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        loading={isFetching}
        onSelect={handleSelect}
        searchValue={search}
        showSearch
        allowClear
        onClear={() => {
          setSearch("");
          onClear?.();
        }}
        onSearch={(val) => setSearch(val)}
        className="rounded border-slate-400"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        options={options}
        placeholder={`Number of Unlicensed User`}
      />
    </Form.Item>
  );
};
