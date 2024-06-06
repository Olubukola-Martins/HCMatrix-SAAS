import { Drawer, Form, Select } from "antd";
import Themes from "components/Themes";
import { IDrawerProps } from "types";
import { TEmployeeFilterProps } from "../types/employee-filter";
import { GENDERS } from "constants/general";
import { FormBranchInput } from "features/core/branches/components/FormBranchInput";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
import { FormRoleInput } from "features/core/roles-and-permissions/components/FormRoleInput";
import { AppButton } from "components/button/AppButton";
import { FormDesignationInput } from "features/core/designations/components/FormDesignationInput";
import { LICENSE_TYPES_OPTIONS } from "../constants";

interface IProps extends IDrawerProps {
  handleFilter: (props: TEmployeeFilterProps) => void; //TODO: find n replace type TEmployeeFilterProps
}

const FilterEmployeeDrawer = ({ handleClose, open, handleFilter }: IProps) => {
  const [form] = Form.useForm<TEmployeeFilterProps>();
  const handleSubmit = (data: TEmployeeFilterProps) => {
    handleFilter(data);
  };
  return (
    <Drawer open={open} onClose={() => handleClose()} title="Filter Employees">
      <Themes>
        <Form
          requiredMark={false}
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item name={"gender"} label="Gender">
            <Select placeholder="Select a gender" options={GENDERS} />
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
          <Form.Item name={`licenseType`} label="License Type">
            <Select
              options={LICENSE_TYPES_OPTIONS}
              mode="multiple"
              placeholder="Select License Type"
            />
          </Form.Item>

          <div className="flex justify-end">
            <div className="flex gap-2">
              <AppButton label="Apply Filter" type="submit" />
              <AppButton
                label="Clear Filter"
                type="button"
                variant="transparent"
                handleClick={() => {
                  form.resetFields();
                  handleFilter({});
                }}
              />
            </div>
          </div>
        </Form>
      </Themes>
    </Drawer>
  );
};

export default FilterEmployeeDrawer;
