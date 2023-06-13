import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import JobApprovalRequestsTable from "./JobApprovalRequestsTable";

interface ComponentProps {}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
}) => {
  return (
    <div>
      <JobApprovalRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component);

const JobApprovalRequestsContainer: React.FC = () => {
  return <ComponentWithHOC />;
};

export default JobApprovalRequestsContainer;
