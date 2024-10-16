import React from "react";
import { LoanTable } from "./data-component/LoanTable";
import {
  TLoanDateAndStatusContainerProps,
  withDateAndStatusContainer,
} from "./hoc/DateAndStatusContainer";
import { usePagination } from "hooks/usePagination";
import { useGetLoanRequests } from "../hooks/requests/useGetLoanRequests";

interface ComponentProps {
  export: () => void;
}
const Component: React.FC<
  ComponentProps & TLoanDateAndStatusContainerProps
> = ({ status, date }) => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetLoanRequests({
    type: undefined,
    props: {
      pagination,
      date,
      status,
    },
  });
  return (
    <div>
      <LoanTable
        loading={isFetching}
        data={data?.data}
        total={data?.total}
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};

const ComponentWithHOC = withDateAndStatusContainer(Component);

const AllLoanRequests: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};

export default AllLoanRequests;
