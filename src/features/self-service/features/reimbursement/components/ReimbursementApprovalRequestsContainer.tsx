import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import ReimbursementApprovalRequestsTable from "./ReimbursementApprovalRequestsTable";

interface ComponentProps {}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
}) => {
  return (
    <div>
      <ReimbursementApprovalRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component);

const ReimbursementApprovalRequestsContainer: React.FC = () => {
  return <ComponentWithHOC />;
};

export default ReimbursementApprovalRequestsContainer;
