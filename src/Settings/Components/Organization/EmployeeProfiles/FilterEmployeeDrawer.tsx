import { Button, Drawer, Form, Input, Select } from "antd";
import React from "react";
import { IDrawerProps } from "../../../../AppTypes/Component";
import Themes from "../../../../Themes/Themes";

const FilterEmployeeDrawer = ({ handleClose, open }: IDrawerProps) => {
  return (
    <Drawer open={open} onClose={() => handleClose()} title="Filter Employees">
      <Themes>
        <Form requiredMark={false} layout="vertical">
          <Form.Item name={"gender"} label="Gender">
            <Select placeholder="Select a gender" />
          </Form.Item>
          <Form.Item name={"departmentId"} label="Department">
            <Select placeholder="Select a department" />
          </Form.Item>
          <Form.Item name={"designationId"} label="Designation">
            <Select placeholder="Select a designation" />
          </Form.Item>
          <Form.Item name={"roleId"} label="Role">
            <Select placeholder="Select a role" />
          </Form.Item>
          <Form.Item name={"status"} label="Status">
            <Select placeholder="Select an employment status" />
          </Form.Item>
          <div className="flex justify-end">
            {/* disabled based on wthr filter is applied     */}
            <div className="flex gap-2">
              <button className="button">Apply Filter</button>
              <Button type="text">Clear Filter</Button>
            </div>
          </div>
        </Form>
      </Themes>
    </Drawer>
  );
};

export default FilterEmployeeDrawer;
