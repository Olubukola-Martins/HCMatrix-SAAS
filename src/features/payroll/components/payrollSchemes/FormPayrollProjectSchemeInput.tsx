import { Select, Form } from "antd";
import { useGetPayrollSchemeByTypeOrId } from "features/payroll/hooks/scheme/useGetPayrollSchemeByTypeOrId";
import { TProjectPayrollScheme } from "features/payroll/types/payrollSchemes/project";
import { useEffect, useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FormPayrollProjectSchemeInput: React.FC<{
  Form: typeof Form;
  showLabel?: boolean;
  onSelect?: (val: number, option: TProjectPayrollScheme[0]) => void;
  control?: { label: string; name: string | (string | number)[] };
}> = ({ Form, showLabel = true, control, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<TProjectPayrollScheme[0][]>([]);

  const { data: schemes, isFetching } = useGetPayrollSchemeByTypeOrId({
    typeOrId: "project",
  });
  const fetchedProjectSchemes = schemes as TProjectPayrollScheme;
  useEffect(() => {
    if (fetchedProjectSchemes && Array.isArray(fetchedProjectSchemes)) {
      const result = fetchedProjectSchemes.filter(
        (item) =>
          item.name.toLowerCase().indexOf(searchTerm?.toLowerCase() ?? "") !==
          -1
      );

      setData(result);
    }
  }, [fetchedProjectSchemes, searchTerm]);

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "projectId"}
      label={showLabel ? control?.label ?? "Project" : null}
      rules={generalValidationRules}
    >
      <Select
        placeholder="Select Project"
        loading={isFetching} //TO DO : this should be added to all custom Fetch Form Inputs
        showSearch
        allowClear
        onClear={() => setSearchTerm("")}
        onSearch={handleSearch}
        className="rounded border-slate-400 w-full"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSelect={(val: number) => {
          const scheme = fetchedProjectSchemes?.find(
            (item) => item.projectId === val
          );
          scheme && onSelect?.(val, scheme);
        }}
      >
        {data?.map((item) => (
          <Select.Option key={item.projectId} value={item.projectId}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
