import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import { PromotionRequestsTable } from "./PromotionRequestsTable";

interface ComponentProps {
  export: () => void;
}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
}) => {
  return (
    <div>
      <PromotionRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component);

export const PromotionRequestsTableContainer: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};
