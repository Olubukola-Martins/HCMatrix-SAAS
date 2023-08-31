import { Select } from "antd";
import { useGetBanksFromPaystack } from "hooks/useGetBanksFromPaystack";
import { useEffect, useState } from "react";
import { TPaystackBank } from "types/paystackBank";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FormBankInput: React.FC<{
  onClear?: () => void;
  handleSelect?: (val: string, bank?: TPaystackBank) => void;
  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control, handleSelect, onClear }) => {
  const { data: banks, isFetching } = useGetBanksFromPaystack();

  const [data, setData] = useState<TPaystackBank[]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    if (banks) {
      const result = banks.data?.filter(
        (item) =>
          item.name.toLowerCase().indexOf(search?.toLowerCase() ?? "") !== -1
      );

      setData(result);
    }
  }, [banks, search]);

  return (
    <Form.Item
      name={control?.name ?? "bankCode"}
      label={showLabel ? control?.label ?? "Bank" : null}
      rules={generalValidationRules}
    >
      <Select
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        loading={isFetching}
        onSelect={(val: string) => {
          const item = banks?.data.find((item) => item.code === val);
          handleSelect?.(val, item);
        }}
        searchValue={search}
        showSearch
        allowClear
        onClear={() => {
          banks && setData(banks.data);
          onClear?.();
        }}
        onSearch={(val) => setSearch(val)}
        className="rounded border-slate-400"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        options={data?.map((item) => ({
          label: `${item.name}`,
          value: item.code,
        }))}
      />
    </Form.Item>
  );
};
