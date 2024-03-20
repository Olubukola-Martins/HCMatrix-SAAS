import { Button, Drawer, Form, InputNumber, Select } from "antd";
import Themes from "components/Themes";
import { AppButton } from "components/button/AppButton";
import { DEFAULT_EXPORT_PAGE_SIZE, GENDERS } from "constants/general";
import { FormBranchInput } from "features/core/branches/components/FormBranchInput";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
import { FormDesignationInput } from "features/core/designations/components/FormDesignationInput";
import { TEmployeeFilterProps } from "features/core/employees/types/employee-filter";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";

import React, { useState } from "react";
import { TbFileExport } from "react-icons/tb";
import { numberHasToBeGreaterThanValueRule } from "utils/formHelpers/validation";

const ExportEmployees: React.FC<{
  trigger?: React.ReactNode;
}> = ({
  trigger = <Button icon={<TbFileExport className="text-2xl" />} type="text" />,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [form] = Form.useForm<TEmployeeFilterProps>();
  const handleSubmit = (data: TEmployeeFilterProps) => {
    console.log(data);
  };
  return (
    <>
      <Drawer
        open={open}
        onClose={() => handleClose()}
        title="Export Employees"
      >
        <Themes>
          <Form
            requiredMark={false}
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            initialValues={{
              limit: DEFAULT_EXPORT_PAGE_SIZE,
            }}
          >
            <Form.Item
              name={"limit"}
              label="Limit"
              rules={[numberHasToBeGreaterThanValueRule(0)]}
            >
              <InputNumber
                placeholder="What is max limit of dataset"
                className="w-full"
              />
            </Form.Item>
            <Form.Item name={"gender"} label="Gender">
              <Select
                placeholder="Select a gender"
                options={GENDERS}
                allowClear
              />
            </Form.Item>
            <FormBranchInput
              Form={Form}
              optional={true}
              control={{ name: "branchId", label: "Branch" }}
            />
            <FormDepartmentInput
              optional={true}
              Form={Form}
              control={{ name: "departmentId", label: "Department" }}
            />
            <FormDesignationInput
              optional={true}
              Form={Form}
              control={{ name: "designationId", label: "Designation" }}
            />
            <FormRoleInput
              Form={Form}
              optional={true}
              control={{ name: "roleId", label: "Role" }}
            />

            <div className="flex justify-end">
              <div className="flex gap-2">
                <AppButton
                  label="Cancel"
                  type="button"
                  variant="transparent"
                  handleClick={() => {
                    form.resetFields();
                  }}
                />
                <AppButton label="Export" type="submit" />
              </div>
            </div>
          </Form>
        </Themes>
      </Drawer>
      <div className="cursor-pointer" onClick={handleOpen}>
        {trigger}
      </div>
    </>
  );
};

export default ExportEmployees;
