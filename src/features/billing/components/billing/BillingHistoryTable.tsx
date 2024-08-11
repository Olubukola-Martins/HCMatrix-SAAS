import React, { useState } from "react";
import { Table, Menu, Dropdown, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { MoreOutlined } from "@ant-design/icons";
import CardWrapper from "../ui/CardWrapper";
import { mockDataBillingHistory } from "features/billing/utils/data";
import { useGetAllSubscriptionTransactions } from "features/billing/hooks/company/transaction/useGetAllSubscriptionTransactions";
import { usePagination } from "hooks/usePagination";
import { appRoutes } from "config/router/paths";
import { useNavigate } from "react-router-dom";
import { useGetCompanyActiveSubscription } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
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

const BillingsHistoryTable: React.FC<BillingsTableProps> = ({ dataHistory = mockDataBillingHistory }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate();
  const { isFetching, data } = useGetCompanyActiveSubscription();
  const [action, setAction] = useState<"download-invoice">();

  // const { pagination, onChange } = usePagination();

  // const { data, isFetching } = useGetAllSubscriptionTransactions({
  //   props: {
  //     pagination,
  //   },
  // });

  const handleMenuClick = (e: any) => {
    console.log("Click", e);
  };

  const menu = (item:any) => (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="view-details" onClick={() => navigate(appRoutes.singleBillingSummary(item.id).path)}>
        View Details
      </Menu.Item>
      <Menu.Item key="download-file" onClick={() => setAction("download-invoice")}>
        Download File
      </Menu.Item>
    </Menu>
  );

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
        <Dropdown overlay={menu(item)} trigger={["click"]}>
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <>
      {data ? <BillingInvoice open={action === "download-invoice"} handleClose={() => setAction(undefined)} subscription={data} /> : null}
      <CardWrapper className="p-6">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataHistory}
          pagination={{ pageSize: 5 }}
          // pagination={{ ...pagination, total: data?.total }}
          // onChange={onChange}
          scroll={{ x: 700 }}
        />
        ;
      </CardWrapper>
    </>
  );
};

export default BillingsHistoryTable;
