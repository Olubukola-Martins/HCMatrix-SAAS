import { ColumnsType } from "antd/es/table";
import { AppButton } from "components/button/AppButton";
import { TLoanTypeProps } from "../../../types/setting";
import { Table } from "antd/lib";
import { AddLoanType } from "./AddLoanType";
import { useState } from "react";

const LoanTypeSetup = () => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const columns: ColumnsType<TLoanTypeProps> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Interest",
      dataIndex: "interest",
    },
    {
      title: "Action",
      render: (_, val) => (
        <div className="flex items-center gap-3">
          <i className="ri-pencil-line"></i>
          <i className="ri-delete-bin-line"></i>
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

      <Table columns={columns} dataSource={[]} className="mt-5" />
    </>
  );
};

export default LoanTypeSetup;
