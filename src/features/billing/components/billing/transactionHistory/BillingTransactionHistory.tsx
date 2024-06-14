import Table, { ColumnsType } from "antd/lib/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import {
  TBillingTransaction,
  useGetAllSubscriptionTransactions,
} from "features/billing/hooks/company/transaction/useGetAllSubscriptionTransactions";
import { usePagination } from "hooks/usePagination";
import dayjs from "dayjs";

import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";

const BillingTransactionHistory = () => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetAllSubscriptionTransactions({
    props: {
      pagination,
    },
  });

  const navigate = useNavigate();
  const columns: ColumnsType<TBillingTransaction> = [
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      render: (_, item) => (
        <span className="">
          {dayjs(item.createdAt).format(DEFAULT_DATE_FORMAT)}{" "}
        </span>
      ),
    },

    {
      title: "Module Purchased",
      dataIndex: "Module Purchased",
      key: "Module Purchased",
      render: (_, item) => <span className="">{item.purchasedCount} </span>,
    },
    {
      title: "No of Licensed Users",
      dataIndex: "No of Licensed Users",
      key: "No of Licensed Users",
      render: (_, item) => (
        <span className="">
          {formatNumberWithCommas(item.licensedEmployeeCount, 0)}{" "}
        </span>
      ),
    },
    {
      title: "No of Unlicensed Users",
      dataIndex: "No of Unlicensed Users",
      key: "No of Unlicensed Users",
      render: (_, item) => (
        <span className="">
          {formatNumberWithCommas(item.unlicensedEmployeeCount, 0)}{" "}
        </span>
      ),
    },

    {
      title: "Billing Cycle",
      dataIndex: "Billing Cycle",
      key: "Billing Cycle",
      render: (_, item) => <span className="">{item.billingCycle} </span>,
    },
    {
      title: "Total Amount",
      dataIndex: "Total Amount",
      key: "Total Amount",
      render: (_, item) => (
        <span className="">{formatNumberWithCommas(item.totalAmount)} </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="view"
                onClick={() =>
                  navigate(appRoutes.singleBillingSummary(item.id).path)
                }
              >
                View
              </Menu.Item>
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
    <div>
      <Table
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        columns={columns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};

export default BillingTransactionHistory;
