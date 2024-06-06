import React from "react";
import { LoanTable } from "./data-component/LoanTable";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { usePagination } from "hooks/usePagination";
import { TLoanRequest } from "../types";

const LoanApprovalsContainer = () => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "loan",
  });
  return (
    <div>
      <LoanTable
        permitedActions={["approve/reject", "view"]}
        loading={isFetching}
        pagination={pagination}
        onChange={onChange}
        total={data?.total}
        data={data?.data
          .filter((item) => item.loan)
          .map((item) => ({
            ...(item.loan as TLoanRequest),
            approvalDetails: item,
            disbursedAt: item?.loan?.disbursedAt,
          }))}
      />
    </div>
  );
};

export default LoanApprovalsContainer;
