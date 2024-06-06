import { ColumnsType } from "antd/lib/table";
import { TEmployeesInPayrollData } from "features/payroll/types";
import moment from "moment";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import { isValidNumber } from "utils/dataHelpers/isValidNumber";

type TColData = ColumnsType<TEmployeesInPayrollData>;
const getEmployee = (
  employeesData: TEmployeesInPayrollData[],
  empuid: string
): TEmployeesInPayrollData | undefined =>
  employeesData.find((employee) => employee.empUid === empuid);
const compareEmployeeNumericCompsToDisplayValues = (
  againstEmployeesData: TEmployeesInPayrollData[],
  selectedEmployee: TEmployeesInPayrollData,

  key: keyof TEmployeesInPayrollData["componentsToDisplay"] | string
): number => {
  const againstEmployee = getEmployee(
    againstEmployeesData,
    selectedEmployee.empUid
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
    selectedEmployee.empUid
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

  _key: keyof TEmployeesInPayrollData["componentsToDisplay"] | string;
}> = ({ againstEmployeesData = [], _key, selectedEmployee }) => {
  const difference = compareEmployeeNumericCompsToDisplayValues(
    againstEmployeesData,
    selectedEmployee,
    _key
  );
  const keyValue = selectedEmployee["componentsToDisplay"]?.[_key]?.toString();
  const keyValueFormatted = formatNumberWithCommas(keyValue);
  return (
    <span>
      {!isValidNumber({ str: keyValue }) ? keyValue : keyValueFormatted}{" "}
      {!Number.isNaN(difference) && difference !== 0 ? (
        <span
          className={`${
            difference > 0 ? "text-red-500" : "text-green-500"
          } text-xs`}
        >
          ({formatNumberWithCommas(difference)})
        </span>
      ) : null}
    </span>
  );
};

const AttrText: React.FC<{
  againstEmployeesData: TEmployeesInPayrollData[];
  selectedEmployee: TEmployeesInPayrollData;

  _key: keyof TEmployeesInPayrollData;
}> = ({ againstEmployeesData, _key, selectedEmployee }) => {
  const difference = compareEmployeeNumericValues(
    againstEmployeesData,
    selectedEmployee,
    _key
  );
  const keyValue = selectedEmployee?.[_key]?.toString();
  const keyValueFormatted = formatNumberWithCommas(keyValue);

  return (
    <span>
      {!isValidNumber({ str: keyValue }) ? keyValue : keyValueFormatted}{" "}
      {!Number.isNaN(difference) && difference !== 0 ? (
        <span
          className={`${
            difference > 0 ? "text-red-500" : "text-green-500"
          } text-xs`}
        >
          ({formatNumberWithCommas(difference)})
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
      title: "UID",
      dataIndex: "UID",
      key: "UID",
      render: (_, item) => item.empUid,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (_, item) => item.fullName,
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      render: (_, item) => moment(item?.payrollDate).format("MMMM,YYYY"),
    },

    {
      title: "Net Pay",
      dataIndex: "Net Pay",
      key: "Net Pay",
      render: (_, item) => (
        <AttrText
          {...{
            againstEmployeesData: againstEmployeesPayrollData,
            _key: "netPay",
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
            _key: "grossPay",
            selectedEmployee: item,
          }}
        />
      ),
    },
    {
      title: "Total Deductions",
      dataIndex: "Total Deductions",
      key: "Total Deductions",
      render: (_, item) => (
        <AttrText
          {...{
            againstEmployeesData: againstEmployeesPayrollData,
            _key: "totalDeductions",
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
            _key: "totalAllowances",
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
            _key: "currency",
            selectedEmployee: item,
          }}
        />
      ),
    },
  ];
};
