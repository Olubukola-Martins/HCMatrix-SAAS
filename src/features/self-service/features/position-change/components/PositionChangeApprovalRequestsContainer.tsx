import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import PositionChangeApprovalRequestsTable from "./PositionChangeApprovalRequestsTable";

interface ComponentProps {}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
}) => {
  return (
    <div>
      <PositionChangeApprovalRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component);

const PositionChangeApprovalRequestsContainer: React.FC = () => {
  return <ComponentWithHOC />;
};

export default PositionChangeApprovalRequestsContainer;
