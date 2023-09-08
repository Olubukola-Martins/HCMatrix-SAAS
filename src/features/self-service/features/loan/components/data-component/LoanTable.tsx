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
import { TLoan } from "../../types";

import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useQueryClient } from "react-query";
import { useApproveORReject } from "hooks/useApproveORReject";
import { QUERY_KEY_FOR_LEAVES } from "features/self-service/features/leave/hooks/useFetchLeaves";
import { APPROVAL_STATUS_ACTION_OPTIONS } from "constants/statustes";
import { LoanDetails } from "../LoanDetails";

type TAction = "approve/reject" | "view";
type TLoanAndApproval = TLoan & { approvalDetails?: TApprovalRequest };
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

  const [loan, setLoan] = useState<TLoan>();
  const [action, setAction] = useState<TAction>();
  const onClose = () => {
    setAction(undefined);
    setLoan(undefined);
  };

  const handleAction = (props: { action: TAction; loan: TLoan }) => {
    const { loan, action } = props;
    setAction(action);
    setLoan(loan);
  };
  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_LEAVES], //TODO: CHange this when loan hooks are created
        // exact: true,
      });
    },
  });

  const columns: ColumnsType<TLoanAndApproval> = [
    {
      title: "Title",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.dateAssigned).format("YYYY/MM/DD")} </span>
      ),
    },

    {
      title: "Request Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.dateAssigned).format("YYYY/MM/DD")} </span>
      ),
    },
    {
      title: "Employee Name",
      dataIndex: "Name",
      key: "Name",
      render: (_, item) => <span className="capitalize">{item.name} </span>,
    },
    {
      title: "Employee ID",
      dataIndex: "empuid",
      key: "empuid",
      render: (_, item) => <span className="capitalize">{item.name} </span>,
    },
    {
      title: "Department",
      dataIndex: "dept",
      key: "dept",
      render: (_, item) => <span className="capitalize">{item.name} </span>,
    },
    {
      title: "Loan Type",
      dataIndex: "ass",
      key: "ass",
      render: (_, item) => (
        <span className="capitalize">
          {getEmployeeFullName(item.assignedTo)}{" "}
        </span>
      ),
    },
    {
      title: "Balance",
      dataIndex: "dept",
      key: "dept",
      render: (_, item) => <span className="capitalize">{item.name} </span>,
    },
    {
      title: "Amount",
      dataIndex: "dept",
      key: "dept",
      render: (_, item) => <span className="capitalize">{item.name} </span>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span
          className="capitalize"
          style={{ color: getAppropriateColorForStatus(item.status) }}
        >
          {item.status}{" "}
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
                    hidden={item.vehicleBooking?.status !== "pending"}
                    key={value}
                    onClick={() =>
                      confirmApprovalAction({
                        approvalStageId: item?.id,
                        status: value,
                        workflowType: !!item?.basicStageId
                          ? "basic"
                          : "advanced",
                        requires2FA: item?.advancedStage?.enableTwoFactorAuth,
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

  return (
    <>
      {loan && (
        <LoanDetails
          handleClose={onClose}
          open={action === "view"}
          id={loan.id}
        />
      )}
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
