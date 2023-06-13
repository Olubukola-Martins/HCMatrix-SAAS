import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import TransferApprovalRequestsTable from "./TransferApprovalRequestsTable";

interface ComponentProps {}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
}) => {
  return (
    <div>
      <TransferApprovalRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component);

const TransferApprovalRequestsContainer: React.FC = () => {
  return <ComponentWithHOC />;
};

export default TransferApprovalRequestsContainer;
