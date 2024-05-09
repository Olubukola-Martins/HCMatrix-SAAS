import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import TravelApprovalRequestsTable from "./TravelApprovalRequestsTable";

interface ComponentProps {}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
}) => {
  return (
    <div>
      <TravelApprovalRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component);

const TravelApprovalRequestsContainer: React.FC = () => {
  return <ComponentWithHOC />;
};

export default TravelApprovalRequestsContainer;
