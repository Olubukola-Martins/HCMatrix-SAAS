import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import PayrollReviewTable from "./PayrollReviewTable";
import { ColumnsType } from "antd/lib/table";
import { TPayrollListData } from "features/payroll/types/payroll";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import { Select } from "antd";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

let OG_COLUMNS: ColumnsType<TPayrollListData> = [
  {
    title: "Created At",
    dataIndex: "crt",
    key: "crt",
    render: (_, item) => (
      <span>{moment(item.createdAt).format("YYYY-MM-DD")} </span>
    ),
  },

  // {
  //   title: "Cycle",
  //   dataIndex: "frequency",
  //   key: "frequency",
  //   render: (_, item) => (
  //     <span className="capitalize">
  //       {item.scheme.type === "project"
  //         ? `Payment ${item.frequency}`
  //         : item.frequency}{" "}
  //     </span>
  //   ),
  // },
  // {
  //   title: "Date",
  //   dataIndex: "Date",
  //   key: "Date",
  //   render: (_, item) => <span>{item.date} </span>,
  // },
  {
    title: "Allowances",
    dataIndex: "allowances",
    key: "allowances",
    render: (_, item) => <span>{item.totalAllowances} </span>,
  },
  {
    title: "Deductions",
    dataIndex: "deductions",
    key: "deductions",
    render: (_, item) => <span>{item.totalDeductions} </span>,
  },
  {
    title: "Tax",
    dataIndex: "tax",
    key: "tax",
    render: (_, item) => <span>{item.totalTax} </span>,
  },
  {
    title: "Gross Pay",
    dataIndex: "grossPay",
    key: "grossPay",
    render: (_, item) => <span>{item.totalGrossPay} </span>,
  },
  {
    title: "Net Pay",
    dataIndex: "netPay",
    key: "netPay",
    render: (_, item) => <span>{item.totalNetPay} </span>,
  },
  {
    title: "Disbursment Date",
    dataIndex: "drt",
    key: "drt",
    ellipsis: true,
    render: (_, item) => (
      <span>{moment(item.disbursementDate).format(DEFAULT_DATE_FORMAT)} </span>
    ),
  },
];
export const PayrollReviewContainer = () => {
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TPayrollListData>>(OG_COLUMNS);
  const navigate = useNavigate();
  const { userPermissions } = useGetUserPermissions();
  return (
    <>
      <div className="flex flex-col gap-6">
        {/* <NewTransfer open={showM} handleClose={() => setShowM(false)} /> */}
        <PageSubHeader
          hideBackground
          description={`You can now review and approve/reject payrolls`}
          actions={[
            {
              name: "Compare",
              handleClick: () => navigate(appRoutes.payrollComparison),
              btnVariant: "transparent",
              hidden: !canUserAccessComponent({
                userPermissions,
                requiredPermissions: ["compare-payrolls"],
              }),
            },
          ]}
          comps={[
            <SelectColumnsBtn
              selectedColumns={selectedColumns}
              setSelectedColumns={setSelectedColumns}
            />,
          ]}
        />

        <PayrollReviewTable
          columns={[
            {
              title: "Name",
              dataIndex: "Name",
              key: "Name",
              ellipsis: true,
              render: (_, item) => (
                <Link
                  to={
                    appRoutes.singlePayroll({
                      scheme: item.scheme.type as TPayrollSchemeType,
                      id: item.id,
                    }).path
                  }
                  className="capitalize text-caramel hover:underline"
                >
                  <span>{item.name} </span>
                </Link>
              ),
            },
            ...selectedColumns,
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (_, item) => (
                <span
                  className="capitalize"
                  style={{
                    color: getAppropriateColorForStatus(item?.status ?? ""),
                  }}
                >
                  {item.status.split("-").join(" ")}{" "}
                </span>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};

export const SelectColumnsBtn: React.FC<{
  setSelectedColumns: (val: ColumnsType<TPayrollListData>) => void;
  selectedColumns: ColumnsType<TPayrollListData>;
}> = ({ setSelectedColumns, selectedColumns }) => {
  const [show, setShow] = useState(false);
  // TODO: Use useRef to ensure that when create payroll is not in focus show is set to false or using antd
  return (
    <div className="relative">
      <button
        className="button flex items-center gap-2"
        onClick={() => setShow((val) => !val)}
      >
        <span>Filter Payroll</span> <i className="fa-solid fa-chevron-down"></i>
      </button>
      {show && (
        <div className="absolute z-50 right-0 w-[400px] mt-2">
          {" "}
          <Select
            getPopupContainer={(triggerNode) =>
              triggerNode.parentElement as HTMLElement
            }
            className="w-full"
            onChange={(val: string[]) =>
              setSelectedColumns(
                OG_COLUMNS.filter(
                  (item) => val.indexOf(item.title as string) !== -1
                )
              )
            }
            value={selectedColumns.map((item) => item.title as string)}
            options={OG_COLUMNS.map((item) => ({
              label: item.title,
              value: item.title,
            }))}
            mode="multiple"
          />
        </div>
      )}
    </div>
  );
};
