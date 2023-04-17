import { Select, Spin } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useFetchDesignations } from "../hooks/useFetchDesignations";

export const FormDesignationInput: React.FC<{
  Form: any;
  showLabel?: boolean;
}> = ({ Form, showLabel = true }) => {
  const { token, companyId } = useApiAuth();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching, isSuccess } = useFetchDesignations({
    companyId,
    searchParams: {
      name: debouncedSearchTerm,
    },

    token,
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name="designationId"
      label={showLabel ? "Designation" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select designation"
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
        {isSuccess ? (
          data.data.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <Spin size="small" />
          </div>
        )}
      </Select>
    </Form.Item>
  );
};
