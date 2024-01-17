import { Select, Form } from "antd";
import { useDebounce } from "hooks/useDebounce";
import React, { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useGetLeaveTypes } from "../../../hooks/leaveTypes/useGetLeaveTypes";
import { TLeaveType } from "../../../types";

export const FormLeaveTypeInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string };
  handleSelect?: (val: number, leaveType?: TLeaveType) => void;
}> = ({ Form, showLabel = true, control, handleSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);
  const { data, isFetching } = useGetLeaveTypes({
    searchParams: {
      name: debouncedSearchTerm,
    },
    isActive: true,

    pagination: {
      offset: 0,
      limit: 40,
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "leaveTypeId"}
      label={showLabel ? control?.label ?? "Leave Type" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select Leave Type"
        loading={isFetching} //TO DO : this should be added to all custom Fetch Form Inputs
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
        onSelect={(val: number) => {
          if (handleSelect) {
            const leaveType = data?.data.find((emp) => emp.id === val);
            handleSelect(val, leaveType);
          }
        }}
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
