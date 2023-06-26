import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import MoneyApprovalRequestsTable from "./MoneyApprovalRequestsTable";

interface ComponentProps {}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
}) => {
  return (
    <div>
      <MoneyApprovalRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component);

const MoneyApprovalRequestsContainer: React.FC = () => {
  return <ComponentWithHOC />;
};

export default MoneyApprovalRequestsContainer;
