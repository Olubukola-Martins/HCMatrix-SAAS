import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import { JobRequestsTable } from "./JobRequestsTable";

interface ComponentProps {
  export: () => void;
}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
  employeeId,
}) => {
  return (
    <div>
      <JobRequestsTable status={status} employeeId={employeeId} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component, {
  filtersToDisplay: ["employee", "status"],
});

export const JobRequestsTableContainer: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};
