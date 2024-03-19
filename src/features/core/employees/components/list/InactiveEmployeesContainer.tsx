import { Input } from "antd";

import InactiveEmpTableView from "./InactiveEmpTableView";
import { useState } from "react";
import { useFetchEmployees } from "../../hooks/useFetchEmployees";
import { TEmployee } from "../../types";
import BulkEmployeeActionHeader from "./bulkEmployeeActions/BulkEmployeeActionHeader";
import { usePagination } from "hooks/usePagination";
import { TEmployeeFilterProps } from "../../types/employee-filter";

type IProps = {
  filterProps: TEmployeeFilterProps;
};
const InactiveEmployeesContainer: React.FC<IProps> = ({ filterProps }) => {
  const { pagination, onChange } = usePagination();
  const [search, setSearch] = useState("");

  const {
    data: employeeData,
    isSuccess,
    isFetching,
  } = useFetchEmployees({
    status: ["suspended", "terminated"],
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
    <div className="flex flex-col gap-4">
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
        <InactiveEmpTableView
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedEmployees.map((item) => item.id),

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

export default InactiveEmployeesContainer;
