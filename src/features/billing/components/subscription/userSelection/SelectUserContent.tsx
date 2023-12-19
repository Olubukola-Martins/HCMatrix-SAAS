import { Checkbox, Pagination, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import { useFetchEmployees } from "features/core/employees/hooks/useFetchEmployees";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { usePagination } from "hooks/usePagination";
import React from "react";
import { boxStyle } from "styles/reused";

const SelectUserContent: React.FC<{
  employeeName?: string;
  departmentId?: number;
}> = ({ employeeName, departmentId }) => {
  const { pagination, onChange } = usePagination({ pageSize: 40 });
  const { data, isLoading } = useFetchEmployees({
    departmentId,
    searchParams: { name: employeeName },
    pagination,
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {" "}
        <Checkbox /> <p>Select All</p>
      </div>
      <Skeleton loading={isLoading} paragraph={{ rows: 20 }}>
        <div className={`${boxStyle} grid gap-4 grid-cols-3`}>
          {data?.data.map((employee) => (
            <div className="flex gap-4" key={employee.id}>
              <Checkbox />
              <p>{getEmployeeFullName(employee)}</p>
            </div>
          ))}
          <div className="col-span-3 flex justify-end mt-4">
            <Pagination {...pagination} onChange={onChange} size="small" />
          </div>
        </div>
      </Skeleton>
      <div className="flex justify-end mt-4">
        <AppButton label="Save" />
      </div>
    </div>
  );
};

export default SelectUserContent;
