import { Form, Input, Modal, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";

import { TPayrollListData } from "features/payroll/types/payroll";
import { useGetAllPayrollsByScheme } from "features/payroll/hooks/payroll/useGetAllPayrollsByScheme";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import { createPayrollDropdownItems } from "../payrollCreations/CreatePayrollButton";

interface IProps extends IModalProps {
  handleSelect: (data: TPayrollListData[]) => void;
}

export const SelectPayrolls: React.FC<IProps> = ({
  open,
  handleClose,
  handleSelect,
}) => {
  const [form] = Form.useForm();

  const [schemeType, setSchemeType] = useState<TPayrollSchemeType>("office");
  const [search, setSearch] = useState<string>("");
  const { data: fetchedPayrolls, isLoading } = useGetAllPayrollsByScheme({
    schemeType,

    data: {
      pagination: { limit: 200, offset: 0 },
      searchParams: {
        name: search,
      },
    },
  });
  const handleSubmit = (data: any) => {
    const payrolls = fetchedPayrolls?.data.filter((item) =>
      data.payrolls.includes(item.id)
    );
    handleSelect(payrolls ?? []);
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Select Payrolls"}
      style={{ top: 5 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        {/* TODO: Add Search by month */}
        <Form.Item label="Search Term">
          <Input
            placeholder="Search by month or name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Form.Item>
        <Form.Item label="Select Scheme Type">
          <Select
            value={schemeType}
            onSelect={(val: TPayrollSchemeType) => setSchemeType(val)}
            options={createPayrollDropdownItems.map((item) => ({
              label: item.name,
              value: item.label,
            }))}
          />
        </Form.Item>
        <Form.Item
          rules={generalValidationRules}
          name="payrolls"
          label="Select payrolls"
        >
          <Select
            allowClear
            loading={isLoading}
            mode="tags"
            options={fetchedPayrolls?.data.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" label="Compare" />
        </div>
      </Form>
    </Modal>
  );
};
