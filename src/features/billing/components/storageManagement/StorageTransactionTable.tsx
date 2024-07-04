import React from "react";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { useGetAllStorageTransactions } from "features/billing/hooks/addOns/extraStorage/transaction/useGetAllStorageTransactions";
import { TStorageTransaction } from "features/billing/types/addOns/extraStorage/strorageTransaction";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { Table } from "antd";


export const StorageTransactionTable: React.FC = () => {
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetAllStorageTransactions({
    props:{
        pagination
    }
  });


  const columns: ColumnsType<TStorageTransaction> = [
    {
      title: "Storage Size",
      dataIndex: "_Storage Size",
      key: "_Storage Size",
      render: (_, item) => <span className="uppercase">{item.size} </span>,
    },

    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      render: (_, item) => <span className="uppercase">{formatNumberWithCommas(item.amount)} </span>,
    },
    {
      title: "Date Purchased",
      dataIndex: "Date Purchased",
      key: "Date Purchased",
      render: (_, item) => (
        <span className="uppercase">{dayjs(item.purchasedDate).format(DEFAULT_DATE_FORMAT)} </span>
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
