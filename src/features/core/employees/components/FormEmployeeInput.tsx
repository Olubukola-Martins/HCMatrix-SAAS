import { Select, Form } from "antd";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import {
  generalValidationRules,
  generalValidationRulesOp,
} from "utils/formHelpers/validation";
import {
  TEmployeeFilterProps,
  useFetchEmployees,
} from "../hooks/useFetchEmployees";
import { TEmployee } from "../types";
import { getEmployeeFullName } from "../utils/getEmployeeFullName";
import { PermissionRestrictor } from "components/permission-restriction/PermissionRestrictor";
import { TSelfServiceApplicationMode } from "features/self-service/types";

type FormEmployeeInputProps = {
  handleSelect?: (val: number, employee?: TEmployee) => void;
  handleClear?: () => void;
  fieldKey?: number;
  Form: typeof Form;
  noStyle?: boolean;
  showLabel?: boolean;
  optional?: boolean;
  mode?: "multiple" | "tags";
  disabled?: boolean;
  control?: { label: string; name: string | (string | number)[] };
  filter?: TEmployeeFilterProps;
};
export const FormEmployeeInput: React.FC<FormEmployeeInputProps> = ({
  Form,
  showLabel = true,
  control,
  handleSelect,
  fieldKey,
  optional = false,
  mode,
  noStyle,
  handleClear,
  disabled,
  filter = {
    status: ["confirmed", "probation"],
  },
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data } = useFetchEmployees({
    searchParams: {
      name: debouncedSearchTerm,
    },
    ...filter,
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  const onClear = () => {
    setSearchTerm("");
    handleClear?.();
  };

  return (
    <Form.Item
      fieldKey={fieldKey}
      noStyle={noStyle}
      name={control?.name ?? "employeeId"}
      label={showLabel ? control?.label ?? "Employee" : null}
      rules={optional ? generalValidationRulesOp : generalValidationRules}
    >
      <Select
        disabled={disabled}
        mode={mode}
        onSelect={(val: number) => {
          const employee = data?.data.find((emp) => emp.id === val);
          handleSelect?.(val, employee);
        }}
        placeholder={`Select employee${!!mode ? "s" : ""}`}
        showSearch
        allowClear
        onClear={onClear}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
      >
        {data?.data.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            [{item.empUid}]{getEmployeeFullName(item)}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

const SELF_SERVICE_APPLICATION_MODE_OPTIONS: {
  label: string;
  value: TSelfServiceApplicationMode;
}[] = [
  { label: "Myself", value: "apply-for-myself" },
  { label: "Unlisenced Employee", value: "apply-for-unlisenced-employee" },
];
// The component below is typically used when applying for self service services on behalf of unlicensed users
export const FormUnlicensedEmployeeSSRequestInput: React.FC<
  FormEmployeeInputProps
> = ({ Form, ...props }) => {
  const [mode, setMode] =
    useState<TSelfServiceApplicationMode>("apply-for-myself");
  return (
    <PermissionRestrictor requiredPermissions={["manage-unlicensed-employees"]}>
      <Form.Item label="On behalf of">
        <Select
          value={mode}
          options={SELF_SERVICE_APPLICATION_MODE_OPTIONS}
          onSelect={setMode}
          placeholder="Who are you applying on behalf of ?"
        />
      </Form.Item>
      {mode === "apply-for-unlisenced-employee" ? (
        <FormEmployeeInput
          {...{
            ...props,
            Form: Form,
            filter: {
              status: ["confirmed", "probation"],
              licenseType: ["unlicensed"],
            },
          }}
        />
      ) : null}
    </PermissionRestrictor>
  );
};
