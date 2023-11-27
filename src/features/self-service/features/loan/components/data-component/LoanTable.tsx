import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  Button,
  Dropdown,
  Menu,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { TLoanRequest } from "../../types";

import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useQueryClient } from "react-query";
import { useApproveORReject } from "hooks/useApproveORReject";
import { APPROVAL_STATUS_ACTION_OPTIONS } from "constants/statustes";
import { LoanDetails } from "../LoanDetails";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { QUERY_KEY_FOR_LOAN_REQUESTS } from "../../hooks/requests/useGetLoanRequests";
import { QUERY_KEY_FOR_LOAN_ANALYTICS } from "../../hooks/analytics/useGetLoanAnalytics";
import { CancelLoan } from "../CancelLoan";

type TAction = "approve/reject" | "view" | "cancel";
type TLoanAndApproval = TLoanRequest & { approvalDetails?: TApprovalRequest };
export const LoanTable: React.FC<{
  data?: TLoanAndApproval[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TLoanAndApproval>["onChange"];
  total?: number;
  permitedActions?: TAction[];
}> = ({
  data,
  loading,
  pagination,
  onChange,
  total,
  permitedActions = ["view"],
}) => {
  const queryClient = useQueryClient();

  const [loan, setLoan] = useState<TLoanRequest>();
  const [action, setAction] = useState<TAction>();
  const onClose = () => {
    setAction(undefined);
    setLoan(undefined);
  };

  const handleAction = (props: { action: TAction; loan: TLoanRequest }) => {
    const { loan, action } = props;
    setAction(action);
    setLoan(loan);
  };
  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_LOAN_REQUESTS],
        // exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_LOAN_ANALYTICS],
        // exact: true,
      });
    },
  });

  const ogColumns: ColumnsType<TLoanAndApproval> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_, item) => <span className="capitalize">{item.title}</span>,
    },

    {
      title: "Request Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.date).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },
    {
      title: "Employee Name",
      dataIndex: "Name",
      key: "Name",
      render: (_, item) => (
        <span className="capitalize">
          {getEmployeeFullName(item.employee)}{" "}
        </span>
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "empuid",
      key: "empuid",
      render: (_, item) => (
        <span className="capitalize">{item.employee.empUid} </span>
      ),
    },
    {
      title: "Department",
      dataIndex: "dept",
      key: "dept",
      render: (_, item) => (
        <span className="capitalize">
          {item.employee.designation.department.name}{" "}
        </span>
      ),
    },
    {
      title: "Loan Type",
      dataIndex: "ass",
      key: "ass",
      render: (_, item) => <span className="capitalize">{item.type.name}</span>,
    },
    {
      title: "Balance",
      dataIndex: "dept",
      key: "dept",
      render: (_, item) => <span className="capitalize">{item.balance} </span>,
    },
    {
      title: "Amount",
      dataIndex: "dept",
      key: "dept",
      render: (_, item) => <span className="capitalize">{item.amount} </span>,
    },
    {
      title: "Disbursed At",
      dataIndex: "disAt",
      key: "disAt",
      render: (_, item) => (
        <span className="capitalize">
          {item.disbursedAt
            ? moment(item.disbursedAt).format(DEFAULT_DATE_FORMAT)
            : ""}{" "}
        </span>
      ),
    },

    {
      title: permitedActions.find((val) => val === "approve/reject")
        ? "Approval Status"
        : "Loan Status",
      dataIndex: "status",
      key: "status",

      render: (_, item) => (
        <span
          className="capitalize"
          style={{
            color: getAppropriateColorForStatus(
              permitedActions.find((val) => val === "approve/reject")
                ? item?.approvalDetails?.status ?? ""
                : item.status
            ),
          }}
        >
          {permitedActions.find((val) => val === "approve/reject")
            ? item?.approvalDetails?.status
            : item.status}{" "}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu>
              {permitedActions.find((val) => val === "cancel") && (
                <Menu.Item
                  hidden={item?.status !== "pending"}
                  key="cancel"
                  onClick={() => handleAction({ loan: item, action: "cancel" })}
                >
                  Cancel
                </Menu.Item>
              )}
              {permitedActions.find((val) => val === "view") && (
                <Menu.Item
                  key="3"
                  onClick={() => handleAction({ loan: item, action: "view" })}
                >
                  View Details
                </Menu.Item>
              )}
              {permitedActions.find((val) => val === "approve/reject") &&
                APPROVAL_STATUS_ACTION_OPTIONS.map(({ value, label }) => (
                  <Menu.Item
                    hidden={item?.approvalDetails?.status !== "pending"}
                    key={value}
                    onClick={() =>
                      item?.approvalDetails &&
                      confirmApprovalAction({
                        approvalStageId: item?.approvalDetails?.id,
                        status: value,
                        workflowType: !!item?.approvalDetails?.basicStageId
                          ? "basic"
                          : "advanced",
                        requires2FA:
                          item?.approvalDetails?.advancedStage
                            ?.enableTwoFactorAuth,
                      })
                    }
                  >
                    {label}
                  </Menu.Item>
                ))}
            </Menu>
          }
          trigger={["click"]}
        >
          <Button title="Actions" icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];
  const columns = permitedActions.find((val) => val === "approve/reject")
    ? ogColumns.filter((item) => item.key !== "disAt")
    : ogColumns;

  return (
    <>
      {loan && (
        <LoanDetails
          handleClose={onClose}
          open={action === "view"}
          id={loan.id}
        />
      )}
      <CancelLoan
        handleClose={onClose}
        open={action === "cancel"}
        data={loan}
      />
      <Table
        size="small"
        dataSource={data}
        loading={loading}
        columns={columns}
        pagination={{ ...pagination, total }}
        onChange={onChange}
      />
    </>
  );
};
