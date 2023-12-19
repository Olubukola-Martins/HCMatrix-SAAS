import { Input } from "antd";
import { SelectDepartment } from "features/core/departments/components/SelectDepartment";
import { SelectEmployee } from "features/core/employees/components/SelectEmployee";
import React from "react";

const SelectUserHeader = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col gap-4">
        <p>Select One</p>
        <div className="flex gap-4">
          <button className="bg-red-300 font-semibold rounded-full px-4 py-2">
            License User
          </button>
          <button className="border  rounded-full px-4 py-2">
            Unlicense User
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p>Select Department</p>
        <SelectDepartment />
      </div>
      <div className="flex flex-col gap-4">
        <p>Search Employee</p>
        <Input placeholder="Search" />
      </div>
    </div>
  );
};

export default SelectUserHeader;
