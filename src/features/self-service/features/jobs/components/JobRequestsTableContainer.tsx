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
}) => {
  return (
    <div>
      <JobRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component);

export const JobRequestsTableContainer: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};
