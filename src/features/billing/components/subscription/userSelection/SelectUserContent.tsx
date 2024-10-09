import { Button, Checkbox, Pagination, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import { UserOneBriefInfoCard } from "components/cards/UserOneBriefInfoCard";
import { useGetAllEmployeesWithLicense } from "features/billing/hooks/company/employeeLicense/useGetAllEmployeesWithLicense";
import { useFetchEmployees } from "features/core/employees/hooks/useFetchEmployees";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { usePagination } from "hooks/usePagination";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { boxStyle } from "styles/reused";

const SelectUserContent: React.FC<{
  licenseType: "licensed" | "unlicensed";

  employeeName?: string;
  departmentId?: number;
  onHandleLisence: { fn: (selected: number[]) => void; isLoading?: boolean };
}> = ({ employeeName, departmentId, onHandleLisence, licenseType }) => {
  const [showOnlyDeactivated, setShowOnlyDeactivated] = useState(false);
  const { pagination, onChange, resetPagination } = usePagination({
    pageSize: 100,
  });
  const { data, isLoading } = useFetchEmployees({
    departmentId,
    pagination,
    licenseType: showOnlyDeactivated ? ["deactivated"] : undefined,
  });
  const {
    data: employeesWithLicense,
    isFetching: isFetchingEmployeesWithLicense,
  } = useGetAllEmployeesWithLicense({ pagination, licenseType });
  useEffect(() => {
    resetPagination();
  }, [departmentId, licenseType, showOnlyDeactivated]);
  const [selected, setSelected] = useState<number[]>([]);
  useLayoutEffect(() => {
    if (!employeesWithLicense) return;
    setSelected(
      () =>
        employeesWithLicense?.data
          .filter((item) => item.licenseType === licenseType)
          .map((item) => item.employeeId) ?? []
    ); //TODO: Remove filter when backend implements licensType on endpoint
  }, [employeesWithLicense, licenseType]);
  const handleCheckBox = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelected(() => data?.data.map((item) => item.id) ?? []);
    if (!checked) setSelected(() => []);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {" "}
          <Checkbox
            onChange={(e) => handleSelectAll(e.target.checked)}
            checked={selected.length === data?.data.length}
          />{" "}
          <p>Select All</p>
        </div>
        <Button
          type="default"
          onClick={() => setShowOnlyDeactivated((val) => !val)}
        >
          {showOnlyDeactivated ? "Show All" : "Show only deactivated employees"}
        </Button>
      </div>
      <Skeleton
        loading={isLoading || isFetchingEmployeesWithLicense}
        paragraph={{ rows: 20 }}
      >
        <div className={`${boxStyle} grid gap-4 grid-cols-3`}>
          {data?.data
            .filter((item) =>
              new RegExp(employeeName ?? "", "i").test(
                `${getEmployeeFullName(item)}`
              )
            )
            ?.map?.((employee) => (
              <div className="flex gap-4" key={employee.id}>
                <Checkbox
                  onChange={() => handleCheckBox(employee.id)}
                  checked={selected.includes(employee.id)}
                  disabled={employee.licenseType !== "deactivated"}
                />
                <UserOneBriefInfoCard
                  {...{
                    info3: employee.licenseType ?? "",
                    info2: employee.designation?.name ?? "",
                    info: employee.empUid ?? "",
                    name: getEmployeeFullName(employee),
                    avatarUrl: employee.avatarUrl,
                  }}
                />
              </div>
            ))}
          <div className="col-span-3 flex justify-end mt-4">
            <Pagination {...pagination} onChange={onChange} size="small" />
          </div>
        </div>
      </Skeleton>
      <div className="flex justify-end mt-4">
        <AppButton
          label="Save"
          disabled={selected?.length === 0}
          handleClick={() => onHandleLisence.fn(selected)}
          isLoading={onHandleLisence?.isLoading}
        />
      </div>
    </div>
  );
};

export default SelectUserContent;
