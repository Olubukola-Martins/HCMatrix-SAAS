import { Select, Form } from "antd";
import { useState } from "react";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";
import { VEHICLE_STATUSES } from "../SelectVehicleStatus";

export const FormVehicleStatusInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  control?: { label: string; name: string | (string | number)[] };
  optional?: boolean;
  mode?: "multiple" | "tags";
}> = ({ Form, showLabel = true, control, optional = false, mode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "status"}
      label={showLabel ? control?.label ?? "Vehicle Status" : null}
      rules={optional ? generalValidationRulesOp : generalValidationRules}
    >
      <Select
        mode={mode}
        showSearch
        searchValue={searchTerm}
        onClear={() => setSearchTerm("")}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        allowClear
        placeholder="Vehicle Status"
        options={VEHICLE_STATUSES.map((item) => ({
          label: item,
          value: item,
        }))}
      />
    </Form.Item>
  );
};
