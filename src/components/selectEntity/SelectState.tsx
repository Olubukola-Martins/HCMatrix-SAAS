import { Select } from "antd";
import { useFetchStates } from "hooks/useFetchStates";
import { useState } from "react";
import { TState } from "types/states";

export const SelectState: React.FC<{
  handleSelect?: (val: number) => void;
  onClear?: () => void;
  countryId?: number;
  value?: number;
}> = ({ handleSelect, countryId, onClear, value }) => {
  const [searchedData, setSearchedData] = useState<TState[]>();

  const { data, isSuccess, isFetching } = useFetchStates({ countryId });

  const handleDataSearch = (val: string) => {
    if (isSuccess) {
      if (val.length > 0) {
        const sData = data.filter(
          (item) => item.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
        );
        setSearchedData(sData);
      } else {
        setSearchedData([]);
      }
    }
  };
  const mainData = !!searchedData ? searchedData : data;

  return (
    <Select
      loading={isFetching}
      onSelect={handleSelect}
      showSearch
      allowClear
      onClear={() => {
        setSearchedData(undefined);
        onClear?.();
      }}
      value={value}
      onSearch={handleDataSearch}
      className="rounded border-slate-400"
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      options={mainData?.map((item) => ({
        label: `${item.name}`,
        value: item.id,
      }))}
      placeholder={`Select State`}
    />
  );
};
