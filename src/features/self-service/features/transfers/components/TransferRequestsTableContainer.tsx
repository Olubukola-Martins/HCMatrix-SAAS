import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import { TransferRequestsTable } from "./TransferRequestsTable";

interface ComponentProps {
  export: () => void;
}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
}) => {
  return (
    <div>
      <TransferRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component, {
  filtersToDisplay: ["employee", "status"],
});

export const TransferRequestsTableContainer: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};
