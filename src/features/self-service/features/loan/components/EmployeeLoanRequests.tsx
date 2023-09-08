import React from "react";
import { LoanTable } from "./data-component/LoanTable";
import {
  TLoanDateAndStatusContainerProps,
  withDateAndStatusContainer,
} from "./hoc/DateAndStatusContainer";

interface ComponentProps {
  export: () => void;
}
const Component: React.FC<
  ComponentProps & TLoanDateAndStatusContainerProps
> = ({ status, date }) => {
  // const { pagination, onChange } = usePagination();

  // const { data, isLoading } = useGetAllTasksAssignedByEmployee({
  //   pagination,
  //   date,
  //   status,
  // });
  return (
    <div>
      <LoanTable />
    </div>
  );
};

const ComponentWithHOC = withDateAndStatusContainer(Component);

const EmployeeLoanRequests: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};

export default EmployeeLoanRequests;
