import { Select, Form } from "antd";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useGetFolders } from "../../hooks/useGetFolders";

export const FormFolderInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  disabled?: boolean;
  control?: { label: string; name: string | (string | number)[] };
}> = ({ Form, showLabel = true, control, disabled = false }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching } = useGetFolders({
    searchParams: {
      name: debouncedSearchTerm,
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "folderId"}
      label={showLabel ? control?.label ?? "Folder" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select Folder"
        loading={isFetching} //TO DO : this should be added to all custom Fetch Form Inputs
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        disabled={disabled}
      >
        {data?.data.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
