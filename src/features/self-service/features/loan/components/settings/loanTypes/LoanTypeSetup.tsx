import { ColumnsType } from "antd/es/table";
import { AppButton } from "components/button/AppButton";
import { Table } from "antd/lib";
import { AddLoanType } from "./AddLoanType";
import { useState } from "react";
import { useGetLoanTypes } from "../../../hooks/type/useGetLoanTypes";
import { TLoanType } from "../../../types";
import { usePagination } from "hooks/usePagination";

const LoanTypeSetup = () => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const { pagination, onChange } = usePagination({ pageSize: 5 });
  const { data, isLoading } = useGetLoanTypes({pagination});

  const columns: ColumnsType<TLoanType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Interest",
      dataIndex: "interestRate",
    },
    {
      title: "Action",
      render: (_, val) => (
        <div className="flex items-center gap-4">
          <i className="ri-pencil-line hover:text-caramel cursor-pointer text-lg"></i>
          <i className="ri-delete-bin-line hover:text-caramel cursor-pointer text-lg"></i>
        </div>
      ),
    },
  ];
  return (
    <>
      <AddLoanType
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
      />

      <h3 className="font-medium pb-2">Set Loan Types</h3>
      <p className="text-sm mb-4">
        Define the various loan types that employees will be able to apply for
      </p>

      <AppButton
        variant="transparent"
        label="+ Add"
        handleClick={() => setOpenAddModal(true)}
      />

      <Table
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        className="mt-5"
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </>
  );
};

export default LoanTypeSetup;
