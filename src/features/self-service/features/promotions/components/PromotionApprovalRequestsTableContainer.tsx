import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import PromotionApprovalRequestsTable from "./PromotionApprovalRequestsTable";

interface ComponentProps {}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
}) => {
  return (
    <div>
      <PromotionApprovalRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component);

const PromotionApprovalRequestsTableContainer: React.FC = () => {
  return <ComponentWithHOC />;
};

export default PromotionApprovalRequestsTableContainer;
