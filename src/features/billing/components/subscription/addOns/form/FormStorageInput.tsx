import { Form, Select } from "antd";
import { useGetAllExtraStorages } from "features/billing/hooks/addOns/extraStorage/useGetAllExtraStorages";
import { useState } from "react";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";

export const FormStorageInput: React.FC<{
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
  const { data, isFetching } = useGetAllExtraStorages();
  const storages = data?.data;

  const [search, setSearch] = useState<string>("");
  const options = storages
    ?.filter(
      (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    )
    .map((c) => ({ label: c.name, value: c.id }));

  return (
    <Form.Item
      name={control?.name ?? "storageId"}
      label={showLabel ? control?.label ?? "Storage" : null}
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
      />
    </Form.Item>
  );
};
