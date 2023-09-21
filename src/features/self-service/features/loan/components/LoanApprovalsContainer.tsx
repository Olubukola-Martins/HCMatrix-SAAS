import React from "react";
import { LoanTable } from "./data-component/LoanTable";
import {
  TLoanDateAndStatusContainerProps,
  withDateAndStatusContainer,
} from "./hoc/DateAndStatusContainer";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { usePagination } from "hooks/usePagination";
import { TLoanRequest } from "../types";

interface ComponentProps {
  export: () => void;
}
const Component: React.FC<
  ComponentProps & TLoanDateAndStatusContainerProps
> = ({ status, date }) => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "loan",
    searchParams: {
      name: date,
    },
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
          }))}
      />
    </div>
  );
};

const ComponentWithHOC = withDateAndStatusContainer(Component);

const LoanApprovalsContainer: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};

export default LoanApprovalsContainer;
