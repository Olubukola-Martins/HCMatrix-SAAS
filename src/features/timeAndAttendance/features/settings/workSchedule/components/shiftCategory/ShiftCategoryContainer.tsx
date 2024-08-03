import React from "react";
import { AddShiftCategoryBtn } from "./AddShiftCategory";
import { ShiftCategoryTable } from "./ShiftCategoryTable";

const ShiftCategoryContainer = () => {
  return (
    <div className="space-y-6">
      <AddShiftCategoryBtn className="flex justify-end" />
      <ShiftCategoryTable />
    </div>
  );
};

export default ShiftCategoryContainer;
