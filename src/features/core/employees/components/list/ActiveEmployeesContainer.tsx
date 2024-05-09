import React, { useState } from "react";
import { useFetchEmployees } from "../../hooks/useFetchEmployees";
import { TEmployee } from "../../types";
import { usePagination } from "hooks/usePagination";
import BulkEmployeeActionHeader from "./bulkEmployeeActions/BulkEmployeeActionHeader";
import { TEmployeeFilterProps } from "../../types/employee-filter";
import { EMPLOYEE_TABLE_COLUMNS } from "./employeeTableColumns";
import { ColumnsType } from "antd/lib/table";
import {
  TGenericEntityTableHOCProps,
  withGenericEntityTableHOCProps,
} from "components/hoc/GenericEntityTableHOC";
import ActiveEmpTableView from "./ActiveEmpTableView";
import { EmployeeCountInfoBtnList } from "./employeeInfoBtns/EmployeeCountInfoBtn";

type IProps = {
  filterProps: TEmployeeFilterProps;
  columns?: ColumnsType<TEmployee>;
  search?: string;
};

const Component: React.FC<IProps & TGenericEntityTableHOCProps> = ({
  ...props
}) => {
  return (
    <div>
      <OriginalActiveEmployeesContainer {...props} />
    </div>
  );
};

const ActiveEmployeesContainer = withGenericEntityTableHOCProps(Component, {
  columns: EMPLOYEE_TABLE_COLUMNS,
  leftComp: <EmployeeCountInfoBtnList statuses={["probation", "confirmed"]} />,
});

const OriginalActiveEmployeesContainer: React.FC<IProps> = ({
  filterProps,
  columns,
  search,
}) => {
  const { pagination, onChange } = usePagination();
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
        <ActiveEmpTableView
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedEmployees.map((item) => item.id),
            ...rowSelection,
          }}
          pagination={{ ...pagination, total: employeeData?.total }}
          loading={isFetching}
          employees={isSuccess ? employeeData.data : []}
          onChange={onChange}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default ActiveEmployeesContainer;
