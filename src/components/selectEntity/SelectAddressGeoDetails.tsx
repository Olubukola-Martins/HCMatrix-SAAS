import { Select } from "antd";
import { useGetAddressGeoCodeDetails } from "hooks/address/useGetAddressGeoCodeDetails";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { TAddressGeoCodeDetails } from "types/address-geo-details";

export const SelectAddressGeoDetails: React.FC<{
  handleSelect?: (place_id: string, details?: TAddressGeoCodeDetails) => void;
  handleClear?: () => void;
  value?: string;
}> = ({
  handleSelect,

  value,
  handleClear,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 100);

  const { data, isLoading } = useGetAddressGeoCodeDetails({
    address: debouncedSearchTerm,
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  const onClear = () => {
    setSearchTerm("");
    handleClear?.();
  };

  return (
    <Select
      value={value}
      loading={isLoading}
      onSelect={(val: string) => {
        const detail = data?.find((emp) => emp.place_id === val);
        handleSelect?.(val, detail);
      }}
      placeholder={`Select address`}
      showSearch
      allowClear
      onClear={onClear}
      onSearch={handleSearch}
      className="rounded border-slate-400 w-full"
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      options={data?.map((item) => ({
        label: <span className="capitalize">{item.formatted_address} </span>,
        value: item.place_id,
      }))}
    />
  );
};
