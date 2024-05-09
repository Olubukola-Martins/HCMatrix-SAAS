import { Select } from "antd";
import { useFetchLgas } from "hooks/useFetchLGAs";
import { useEffect, useState } from "react";
import { TLga } from "types/lgas";

export const SelectLGA: React.FC<{
  stateId?: number;
  handleSelect?: (val: number) => void;
  onClear?: () => void;
  onFetchSuccess?: (dataIsEmpty: boolean) => void;
  value?: number;
}> = ({ stateId, handleSelect, onClear, onFetchSuccess, value }) => {
  const [searchedData, setSearchedData] = useState<TLga[]>();

  const { data, isSuccess, isFetching } = useFetchLgas({ stateId });

  useEffect(() => {
    if (isSuccess && data) {
      onFetchSuccess?.(data.length === 0);
    }
  }, [isSuccess, data, onFetchSuccess]);

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
      showSearch
      allowClear
      onClear={() => {
        setSearchedData(undefined);
        onClear?.();
      }}
      value={value}
      onSelect={handleSelect}
      onSearch={handleDataSearch}
      className="rounded border-slate-400"
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      options={mainData?.map((item) => ({
        label: `${item.name}`,
        value: item.id,
      }))}
      placeholder="Select LGA"
    />
  );
};
