import React, { useState } from "react";
import ActiveEmpTableView from "./ActiveEmpTableView";
import { useFetchEmployees } from "../../hooks/useFetchEmployees";
import { TEmployee } from "../../types";
import { usePagination } from "hooks/usePagination";
import BulkEmployeeActionHeader from "./bulkEmployeeActions/BulkEmployeeActionHeader";
import { TEmployeeFilterProps } from "../../types/employee-filter";
import { Input } from "antd";

type IProps = {
  filterProps: TEmployeeFilterProps;
};

const ActiveEmployeesContainer: React.FC<IProps> = ({ filterProps }) => {
  const { pagination, onChange } = usePagination();
  const [search, setSearch] = useState("");
  const {
    data: employeeData,
    isSuccess,
    isFetching,
  } = useFetchEmployees({
    status: ["probation", "confirmed"],
    ...filterProps,
    searchParams: {
      name: search,
    },

    pagination,
  });
  const [selectedEmployees, setSelectedEmployees] = useState<TEmployee[]>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TEmployee[]) => {
      setSelectedEmployees(selectedRows);
    },
  };
  const clearSelectedEmployees = () => setSelectedEmployees([]);
  return (
    <div className="flex flex-col gap-6">
      <BulkEmployeeActionHeader
        data={selectedEmployees}
        clearSelectedEmployees={clearSelectedEmployees}
      />
      <div className="space-y-4">
        <div className="flex justify-end">
          <Input.Search
            className="w-1/6"
            onSearch={(val) => setSearch(val)}
            placeholder="Search"
            allowClear
          />
        </div>
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
    </div>
  );
};

export default ActiveEmployeesContainer;
