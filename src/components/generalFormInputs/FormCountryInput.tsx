import { Select } from "antd";
import { useFetchCountries } from "hooks/useFetchCountries";
import { useEffect, useState } from "react";
import { TCountry } from "types/country";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FormCountryInput: React.FC<{
  onClear?: () => void;
  handleSelect?: (val: number) => void;
  Form: any;
  showLabel?: boolean;
  control?: { label: string; name: string };
}> = ({ Form, showLabel = true, control, handleSelect, onClear }) => {
  const { data: countries, isFetching } = useFetchCountries();

  const [data, setData] = useState<TCountry[]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    if (countries) {
      const result = countries?.filter(
        (item) =>
          item.name.toLowerCase().indexOf(search?.toLowerCase() ?? "") !== -1
      );

      setData(result);
    }
  }, [countries, search]);

  return (
    <Form.Item
      name={control?.name ?? "countryId"}
      label={showLabel ? control?.label ?? "Country" : null}
      rules={generalValidationRules}
    >
      <Select
        loading={isFetching}
        onSelect={handleSelect}
        searchValue={search}
        showSearch
        allowClear
        onClear={() => {
          countries && setData(countries);
          onClear?.();
        }}
        onSearch={(val) => setSearch(val)}
        className="rounded border-slate-400"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        options={data?.map((item) => ({
          label: `${item.name}`,
          value: item.id,
        }))}
      />
    </Form.Item>
  );
};
