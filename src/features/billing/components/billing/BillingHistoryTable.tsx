import React, { useState } from "react";
import { Table, Dropdown, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { MoreOutlined } from "@ant-design/icons";
import CardWrapper from "../ui/CardWrapper";
import { mockDataBillingHistory } from "features/billing/utils/data";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import BillingInvoice from "./BillingInvoice";

export interface BillingData {
  key: React.Key;
  id: number;
  billings: string;
  date: string;
  status: string;
  type: string;
  amount: string;
  billingCycle: string;
}

interface BillingsTableProps {
  dataHistory?: BillingData[];
}

const BillingsHistoryTable: React.FC<BillingsTableProps> = ({
  dataHistory = mockDataBillingHistory,
}) => {
  const navigate = useNavigate();
  const [action, setAction] = useState<"download-invoice">();
  const [history, setHistory] = useState<BillingData>();
  const handleAction = (action: "download-invoice", history: BillingData) => {
    setAction(action);
    setHistory(history);
  };

  const handleClose = () => {
    setAction(undefined);
    setHistory(undefined);
  };

  const columns: ColumnsType<BillingData> = [
    {
      title: "Billings",
      dataIndex: "billings",
      key: "billings",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Billing Cycle",
      dataIndex: "billingCycle",
      key: "billingCycle",
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 0,
                label: "View Details",
                onClick: () =>
                  navigate(appRoutes.singleBillingSummary(item.id).path),
              },
              {
                key: 1,
                label: "Download Invoice",
                onClick: () => handleAction("download-invoice", item),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      {history ? (
        <BillingInvoice
          open={action === "download-invoice"}
          handleClose={handleClose}
          billingHistoryId={history.id}
        />
      ) : null}
      <CardWrapper className="p-6">
        <Table
          columns={columns}
          dataSource={dataHistory}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 700 }}
        />
        ;
      </CardWrapper>
    </>
  );
};

export default BillingsHistoryTable;
