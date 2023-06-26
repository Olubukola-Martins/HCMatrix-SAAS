import {
  TApprovalStatusContainerProps,
  withApprovalStatusContainer,
} from "components/containers/ApprovalStatusContainer";
import { MonetaryRequestsTable } from "./MonetaryRequestsTable";

interface ComponentProps {
  export: () => void;
}

const Component: React.FC<ComponentProps & TApprovalStatusContainerProps> = ({
  status,
}) => {
  return (
    <div>
      <MonetaryRequestsTable status={status} />
    </div>
  );
};
const ComponentWithHOC = withApprovalStatusContainer(Component);

export const MonetaryRequestsTableContainer: React.FC = () => {
  return <ComponentWithHOC export={() => {}} />;
};
