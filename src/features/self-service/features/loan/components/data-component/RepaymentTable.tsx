import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  Button,
  Dropdown,
  Menu,
  TablePaginationConfig,
  TableProps,
} from "antd";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { TLoanRepayment } from "../../types";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { RepaymentDetails } from "../repayments/RepaymentDetails";
import { TableWithFocusType } from "components/table";

type TAction = "view";

const RepaymentTable: React.FC<{
  data?: TLoanRepayment[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TLoanRepayment>["onChange"];
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
  const [repayment, setRepayment] = useState<TLoanRepayment>();
  const [action, setAction] = useState<TAction>();
  const onClose = () => {
    setAction(undefined);
    setRepayment(undefined);
  };

  const handleAction = (props: {
    action: TAction;
    repayment: TLoanRepayment;
  }) => {
    const { repayment, action } = props;
    setAction(action);
    setRepayment(repayment);
  };

  const columns: ColumnsType<TLoanRepayment> = [
    {
      title: "Loan",
      dataIndex: "loan",
      key: "loan",
      render: (_, item) => (
        <span className="capitalize">{item.loan.title} </span>
      ),
    },

    {
      title: "Loan Type",
      dataIndex: "type",
      key: "type",
      render: (_, item) => (
        <span className="capitalize">{item.loan.type.name} </span>
      ),
    },
    {
      title: "Employee Name",
      dataIndex: "Name",
      key: "Name",
      render: (_, item) => (
        <span className="capitalize">{item.employeeFullName} </span>
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "empuid",
      key: "empuid",
      render: (_, item) => <span className="capitalize">{item.empUid} </span>,
    },

    {
      title: "Amount Paid",
      dataIndex: "amount",
      key: "amount",
      render: (_, item) => <span className="capitalize">{item.amount} </span>,
    },
    {
      title: "Paid At",
      dataIndex: "paidAt",
      key: "paidAt",
      render: (_, item) => (
        <span className="capitalize">
          {moment(item.createdAt).format(DEFAULT_DATE_FORMAT)}{" "}
        </span>
      ),
    },

    {
      title: "Payment Status",
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
                  onClick={() =>
                    handleAction({ repayment: item, action: "view" })
                  }
                >
                  View Details
                </Menu.Item>
              )}
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
      {repayment && (
        <RepaymentDetails
          handleClose={onClose}
          open={action === "view"}
          data={repayment}
        />
      )}
      <TableWithFocusType
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

export default RepaymentTable;
