import { Select } from "antd";
import { useFetchCountries } from "hooks/useFetchCountries";
import { useEffect, useState } from "react";
import { TCountry } from "types/country";

export const SelectCountry: React.FC<{
  onClear?: () => void;
  handleSelect?: (id: number, country?: TCountry) => void;
  value?: number;
}> = ({ handleSelect, onClear, value }) => {
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
    <Select
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      loading={isFetching}
      onSelect={(id: number) => {
        const country = countries?.find((country) => country.id === id);
        handleSelect?.(id, country);
      }}
      searchValue={search}
      showSearch
      allowClear
      value={value}
      onClear={() => {
        countries && setData(countries);
        onClear?.();
      }}
      onSearch={(val) => setSearch(val)}
      className="rounded border-slate-400 w-full"
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      options={data?.map((item) => ({
        label: `${item.name}`,
        value: item.id,
      }))}
      placeholder="Select Country"
    />
  );
};
