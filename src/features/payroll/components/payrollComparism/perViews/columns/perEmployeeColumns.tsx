import { ColumnsType } from "antd/lib/table";
import { TEmployeesInPayrollData } from "features/payroll/types";

type TColData = ColumnsType<TEmployeesInPayrollData>;
const getEmployee = (
  employeesData: TEmployeesInPayrollData[],
  employeeId: number
): TEmployeesInPayrollData | undefined =>
  employeesData.find((employee) => employee.id === employeeId);
const compareEmployeeNumericCompsToDisplayValues = (
  againstEmployeesData: TEmployeesInPayrollData[],
  selectedEmployee: TEmployeesInPayrollData,

  key: keyof TEmployeesInPayrollData["componentsToDisplay"] | string
): number => {
  const againstEmployee = getEmployee(
    againstEmployeesData,
    selectedEmployee.id
  );
  let value = 0;
  if (againstEmployee === undefined) {
    return value;
  }

  value =
    +(selectedEmployee["componentsToDisplay"]?.[key] as number | string) -
    +(againstEmployee["componentsToDisplay"]?.[key] as number | string);
  return value;
};
const compareEmployeeNumericValues = (
  againstEmployeesData: TEmployeesInPayrollData[],
  selectedEmployee: TEmployeesInPayrollData,

  key: keyof TEmployeesInPayrollData
): number => {
  const againstEmployee = getEmployee(
    againstEmployeesData,
    selectedEmployee.id
  );
  let value = 0;
  if (againstEmployee === undefined) {
    return value;
  }

  if (
    ["string", "number"].includes(typeof selectedEmployee[key]) &&
    ["string", "number"].includes(typeof againstEmployee[key])
  ) {
    value =
      +(selectedEmployee[key] as number | string) -
      +(againstEmployee[key] as number | string);
    return value;
  }
  return value;
};

export const AttrCompsToDisplayText: React.FC<{
  againstEmployeesData?: TEmployeesInPayrollData[];
  selectedEmployee: TEmployeesInPayrollData;

  key: keyof TEmployeesInPayrollData["componentsToDisplay"] | string;
}> = ({ againstEmployeesData = [], key, selectedEmployee }) => {
  const difference = compareEmployeeNumericCompsToDisplayValues(
    againstEmployeesData,
    selectedEmployee,
    key
  );
  return (
    <span>
      {selectedEmployee["componentsToDisplay"]?.[key]}{" "}
      {difference === 0 ? (
        <span className={difference > 0 ? "text-green-500" : "text-red-500"}>
          ({difference})
        </span>
      ) : null}
    </span>
  );
};
const AttrText: React.FC<{
  againstEmployeesData: TEmployeesInPayrollData[];
  selectedEmployee: TEmployeesInPayrollData;

  key: keyof TEmployeesInPayrollData;
}> = ({ againstEmployeesData, key, selectedEmployee }) => {
  const difference = compareEmployeeNumericValues(
    againstEmployeesData,
    selectedEmployee,
    key
  );
  return (
    <span>
      {["string", "number"].includes(
        typeof selectedEmployee[key] ? (selectedEmployee[key] as string) : ""
      )}{" "}
      {difference === 0 ? (
        <span className={difference > 0 ? "text-green-500" : "text-red-500"}>
          ({difference})
        </span>
      ) : null}
    </span>
  );
};
export const PAYROLL_COMPARISON_PER_EMPLOYEE_TABLE_COLUMNS = ({
  extraColumns = [],
  againstEmployeesPayrollData = [],
}: {
  againstEmployeesPayrollData?: TEmployeesInPayrollData[];
  extraColumns?: TColData;
}): TColData => {
  return [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (_, item) => item.fullName,
    },

    {
      title: "Net Pay",
      dataIndex: "Net Pay",
      key: "Net Pay",
      render: (_, item) => (
        <AttrText
          {...{
            againstEmployeesData: againstEmployeesPayrollData,
            key: "netPay",
            selectedEmployee: item,
          }}
        />
      ),
    },
    {
      title: "Gross Pay",
      dataIndex: "Gross Pay",
      key: "Gross Pay",
      render: (_, item) => (
        <AttrText
          {...{
            againstEmployeesData: againstEmployeesPayrollData,
            key: "grossPay",
            selectedEmployee: item,
          }}
        />
      ),
    },
    {
      title: "Total Deductions",
      dataIndex: "Gross Pay",
      key: "Gross Pay",
      render: (_, item) => (
        <AttrText
          {...{
            againstEmployeesData: againstEmployeesPayrollData,
            key: "totalDeductions",
            selectedEmployee: item,
          }}
        />
      ),
    },
    {
      title: "Total Allowances",
      dataIndex: "Total Allowances",
      key: "Total Allowances",
      render: (_, item) => (
        <AttrText
          {...{
            againstEmployeesData: againstEmployeesPayrollData,
            key: "totalAllowances",
            selectedEmployee: item,
          }}
        />
      ),
    },
    ...extraColumns,
    {
      title: "Exchange Rate",
      dataIndex: "Exchange Rate",
      key: "Exchange Rate",
      render: (_, item) => (
        <AttrText
          {...{
            againstEmployeesData: againstEmployeesPayrollData,
            key: "currency",
            selectedEmployee: item,
          }}
        />
      ),
    },
  ];
};
