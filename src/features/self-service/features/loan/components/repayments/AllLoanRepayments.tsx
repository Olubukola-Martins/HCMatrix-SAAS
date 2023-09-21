import React from "react";
import RepaymentTable from "../data-component/RepaymentTable";
import { usePagination } from "hooks/usePagination";
import { useGetLoanRepayments } from "../../hooks/repayment/useGetLoanRepayments";

const AllLoanRepayments = () => {
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetLoanRepayments({
    type: "all",
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

export default AllLoanRepayments;
