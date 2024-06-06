import { Select } from "antd";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";

import { TFolderListItem } from "../../types";
import { useGetFolders } from "../../hooks/useGetFolders";

export const SelectFolder: React.FC<{
  handleSelect?: (val: number, folder?: TFolderListItem) => void;
  handleClear?: () => void;
  mode?: "multiple" | "tags";
  value?: number;
}> = ({
  handleSelect,

  mode,
  value,
  handleClear,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isLoading } = useGetFolders({
    searchParams: {
      name: debouncedSearchTerm,
    },
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
      mode={mode}
      loading={isLoading}
      onSelect={(val: number) => {
        const employee = data?.data.find((emp) => emp.id === val);
        handleSelect?.(val, employee);
      }}
      placeholder={`Select folder${!!mode ? "s" : ""}`}
      showSearch
      allowClear
      onClear={onClear}
      onSearch={handleSearch}
      className="rounded border-slate-400 w-full"
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      options={data?.data.map((item) => ({
        label: <span className="capitalize">{item.name} </span>,
        value: item.id,
      }))}
    ></Select>
  );
};
