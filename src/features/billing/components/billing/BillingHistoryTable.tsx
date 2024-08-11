import React, { useState } from "react";
import { Table, Menu, Dropdown, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { MoreOutlined } from "@ant-design/icons";
import CardWrapper from "../ui/CardWrapper";
import { mockDataBillingHistory } from "features/billing/utils/data";
import { useGetAllSubscriptionTransactions } from "features/billing/hooks/company/transaction/useGetAllSubscriptionTransactions";
import { usePagination } from "hooks/usePagination";

export interface BillingData {
  key: React.Key;
  billings: string;
  date: string;
  status: string;
  type: string;
  amount: string;
  billingCycle: string;
}

interface BillingsTableProps {
  data?: BillingData[];
}

const BillingsHistoryTable: React.FC<BillingsTableProps> = ({ data = mockDataBillingHistory }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const { pagination, onChange } = usePagination();

  // const { data, isFetching } = useGetAllSubscriptionTransactions({
  //   props: {
  //     pagination,
  //   },
  // });

  const handleMenuClick = (e: any) => {
    console.log("Click", e);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="view-details">View Details</Menu.Item>
      <Menu.Item key="download-file">Download File</Menu.Item>
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
      render: () => (
        <Dropdown overlay={menu} trigger={["click"]}>
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
    <CardWrapper className="p-6">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        // pagination={{ ...pagination, total: data?.total }}
        // onChange={onChange}
        scroll={{ x: 700 }}
      />
      ;
    </CardWrapper>
  );
};

export default BillingsHistoryTable;
