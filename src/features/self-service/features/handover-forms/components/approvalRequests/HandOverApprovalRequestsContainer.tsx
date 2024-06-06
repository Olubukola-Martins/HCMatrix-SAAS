import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import HandOverApprovalRequestsTable from "./HandOverApprovalRequestsTable";

interface ComponentProps {}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
}) => {
  return (
    <div>
      <HandOverApprovalRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component);

const HandOverApprovalRequestsContainer: React.FC = () => {
  return <ComponentWithHOC />;
};

export default HandOverApprovalRequestsContainer;
