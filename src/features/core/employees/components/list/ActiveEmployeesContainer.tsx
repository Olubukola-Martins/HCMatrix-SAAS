import React, { useState } from "react";
import ActiveEmpTableView from "./ActiveEmpTableView";
import { useFetchEmployees } from "../../hooks/useFetchEmployees";
import { TEmployee } from "../../types";
import { usePagination } from "hooks/usePagination";
import BulkEmployeeActionHeader from "./bulkEmployeeActions/BulkEmployeeActionHeader";

const ActiveEmployeesContainer = () => {
  const { pagination, onChange } = usePagination();
  const {
    data: employeeData,
    isSuccess,
    isFetching,
  } = useFetchEmployees({
    status: ["probation", "confirmed"],

    pagination,
  });
  const [selectedEmployees, setSelectedEmployees] = useState<TEmployee[]>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TEmployee[]) => {
      setSelectedEmployees(selectedRows);
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <BulkEmployeeActionHeader data={selectedEmployees} />
      <ActiveEmpTableView
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        pagination={{ ...pagination, total: employeeData?.total }}
        loading={isFetching}
        employees={isSuccess ? employeeData.data : []}
        onChange={onChange}
      />
    </div>
  );
};

export default ActiveEmployeesContainer;
