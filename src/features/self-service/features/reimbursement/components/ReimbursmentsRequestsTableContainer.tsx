import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import { ReimbursementRequestsTable } from "./ReimbursementRequestsTable";

interface ComponentProps {
  export: () => void;
}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
  employeeId,
}) => {
  return (
    <div>
      <ReimbursementRequestsTable status={status} employeeId={employeeId} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component, {
  filtersToDisplay: ["employee", "status"],
});

export const ReimbursmentsRequestsTableContainer: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};
