import { Select, Form } from "antd";
import { Rule } from "antd/lib/form";
import { useGetBanksFromPaystack } from "hooks/useGetBanksFromPaystack";
import { useEffect, useState } from "react";
import { TPaystackBank } from "types/paystackBank";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FormBankInput: React.FC<{
  onClear?: () => void;
  handleSelect?: (val: string, bank?: TPaystackBank) => void;
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string };
  noStyle?: boolean;
  className?: string;
  rules?: Rule[];
}> = ({
  Form,
  showLabel = true,
  control,
  handleSelect,
  onClear,
  noStyle,
  className = "rounded border-slate-400",
  rules = generalValidationRules,
}) => {
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
      rules={rules}
      noStyle={noStyle}
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
        className={className}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        options={data?.map((item) => ({
          label: `${item.name}`,
          value: item.code,
        }))}
        placeholder="Select a Bank"
      />
    </Form.Item>
  );
};
