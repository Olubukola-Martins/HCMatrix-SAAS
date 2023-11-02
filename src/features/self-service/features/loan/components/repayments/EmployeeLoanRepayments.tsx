import React from "react";
import RepaymentTable from "../data-component/RepaymentTable";
import { useGetLoanRepayments } from "../../hooks/repayment/useGetLoanRepayments";
import { usePagination } from "hooks/usePagination";

const EmployeeLoanRepayments = () => {
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetLoanRepayments({
    type: "mine",
    props: {
      pagination,
    },
  });
  return (
    <div>
      <RepaymentTable
        loading={isFetching}
        data={data?.data}
        total={data?.total}
        onChange={onChange}
      />
    </div>
  );
};

export default EmployeeLoanRepayments;
