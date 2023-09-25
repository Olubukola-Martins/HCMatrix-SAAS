import { Select, Spin } from "antd";
import { useGetPayrollTemplates } from "features/payroll/hooks/templates/useGetPayrollTemplates";
import { TPayrollTemplateListData } from "features/payroll/types/template";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";

export const FormPayrollReportTemplateInput: React.FC<{
  Form: any;
  showLabel?: boolean;
  onSelect?: (val: number, option: TPayrollTemplateListData) => void;
  control?: { label: string; name: string | (string | number)[] };
}> = ({ Form, showLabel = true, control, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const { data, isFetching, isSuccess } = useGetPayrollTemplates({
    type: "payroll",
    data: {
      searchParams: {
        name: debouncedSearchTerm,
      },
    },
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <Form.Item
      name={control?.name ?? "payrollReportTemplateId"}
      label={showLabel ? control?.label ?? "Payroll Report Template" : null}
      rules={generalValidationRules}
      labelCol={{ span: 24 }}
    >
      <Select
        placeholder="Select Payroll Report Template"
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
          const category = data?.data.find((item) => item.id === val);
          category && onSelect?.(val, category);
        }}
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
