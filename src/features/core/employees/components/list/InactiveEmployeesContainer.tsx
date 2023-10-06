import { TablePaginationConfig } from "antd";

import InactiveEmpTableView from "./InactiveEmpTableView";
import { useState } from "react";
import { useFetchEmployees } from "../../hooks/useFetchEmployees";
import { TEmployee } from "../../types";
import BulkEmployeeActionHeader from "./bulkEmployeeActions/BulkEmployeeActionHeader";
import { usePagination } from "hooks/usePagination";

const InactiveEmployeesContainer = () => {
  const { pagination, onChange } = usePagination();
  const {
    data: employeeData,
    isSuccess,
    isFetching,
  } = useFetchEmployees({
    status: ["suspended", "terminated"],

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

      <InactiveEmpTableView
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

export default InactiveEmployeesContainer;
