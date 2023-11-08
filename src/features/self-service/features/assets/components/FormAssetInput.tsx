import { Select, Form } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useGetAssets } from "../hooks/useGetAssets";

export const FormAssetInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string | (string | number)[] };
}> = ({ Form, showLabel = true, control }) => {
  const { token, companyId } = useApiAuth();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching } = useGetAssets({
    companyId,
    searchParams: {
      name: debouncedSearchTerm,
    },
    status: "unassigned", //only unassigned assets should be displayed

    token,
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "assetTypeId"}
      label={showLabel ? control?.label ?? "Asset Type" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select Asset"
        loading={isFetching} //TO DO : this should be added to all custom Fetch Form Inputs
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
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
